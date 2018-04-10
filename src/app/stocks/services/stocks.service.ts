import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { BatchStockData, StockInfo, StockQuote, StockChart, StockQueryRange, IEXMonthChartEntry, StockSearchResult, QueryStockInfoOptions, IEXDayChartEntry, IEXChartEntry, StockSearchResults } from "@app/stocks/models";

@Injectable()
export class StocksService {
	constructor(private http: HttpClient) {}

	queryBatchStockPrices(stocks: string[]): Observable<BatchStockData> {
		if (stocks.length === 0) return Observable.of({});
		// Note: Each query only returns the first 100 stocks.
		const symbols = stocks.join(",");
		const queryUrl = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=price`;
		return this.http
			.get<BatchStockData>(queryUrl);
	}

	getStockInfo({ ticker, range = "1m" }: QueryStockInfoOptions): Observable<StockInfo> {
		const queryUrl = `https://api.iextrading.com/1.0/stock/${ticker}/batch?types=`
				+ `quote,chart,company,dividends,earnings,financials,news,splits,stats&range=${range}`;
		return this.http
			.get<any>(queryUrl)
			.pipe(
				map(response => {
					return {
						stockQuote: this.parseSymbol(response.quote),
						stockChart: this.parseIEXChart(response.chart, range),
						stockCompanyInfo: this.parseSymbol(response.company),
						stockDividendsInfo: response.dividends,
						stockEarningsInfo: response.earnings,
						stockFinancialsInfo: response.financials,
						stockNews: response.news,
						stockSplits: response.splits,
						stockStats: this.parseSymbol(response.stats)
					};
				})
			);
	}

	getStockChart(ticker: string, range: StockQueryRange = "1m"): Observable<StockChart> {
		if (range === "1d") {
			const queryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=WCEPZHFS9KKUZBRJ`;
			return this.http
				.get<any>(queryUrl).pipe(
					map(response => this.parseChart(response))
				);
		}
		let simplify = range === "2y" || range === "5y";
		const queryUrl = `https://api.iextrading.com/1.0/stock/${ticker}/chart/${range}?chartSimplify=${simplify}`;

		return this.http
			.get<IEXChartEntry[]>(queryUrl).pipe(
				map(response => this.parseIEXChart(response, range))
			);
	}

	private parseSymbol(iexResponse: any) {
		const { symbol: ticker, ...data } = iexResponse;
		return {
			ticker, ...data
		};
	}

	private parseIEXChart(iexResponse: IEXChartEntry[], range: StockQueryRange) {
		return {
			data: iexResponse.map((entry: any) => ({
				label: entry.label,
				value: range === "1d" ? (entry.average == 0 ? 10 : entry.average) : entry.close
			}))
		};
	}

	private parseChart(response) {
		return {
			data: Object.keys(response["Time Series (1min)"]).map(key => ({
				label: key.split(" ")[1],
				value: parseFloat(response["Time Series (1min)"][key]["1. open"])
			}))
		}
	}

	runStockSearch(search: string): Observable<StockSearchResults> {
		const queryUrl = `https://virtualstocksapi.pandadevgroup.com/search/${search}`;
		return this.http.get<StockSearchResult[]>(queryUrl)
			.map(results => ({ results, search }));
	}
}
