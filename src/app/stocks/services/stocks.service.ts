import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { BatchStockData, StockInfo, StockQuote, StockChart, StockQueryRange, IEXMonthChartEntry, StockSearchResult, QueryStockInfoOptions, IEXDayChartEntry, IEXChartEntry, StockSearchResults, BatchStockChartData } from "@app/stocks/models";

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
						stockChart: this.parseChart(response.chart, range),
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
		let simplify = range === "2y" || range === "5y";
		const queryUrl = `https://api.iextrading.com/1.0/stock/${ticker}/chart/${range}?chartSimplify=${simplify}`;

		return this.http
			.get<IEXChartEntry[]>(queryUrl).pipe(
				map(response => this.parseChart(response, range))
			);
	}

	getBatchStockCharts(tickers: string[], range: StockQueryRange = "1d"): Observable<BatchStockChartData> {
		let simplify = range === "2y" || range === "5y";
		const queryUrl = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers.join(",")}&types=chart&range=${range}&chartSimplify=${simplify}`;

		return this.http
			.get<{ [ticker: string]: { chart: IEXChartEntry[] } }>(queryUrl).pipe(
				map(response => {
					let parsed = {};
					for (let ticker of Object.keys(response)) {
						parsed[ticker] = this.parseChart(response[ticker].chart, range);
					}
					return parsed;
				})
			);
	}

	private parseSymbol(iexResponse: any) {
		const { symbol: ticker, ...data } = iexResponse;
		return {
			ticker, ...data
		};
	}

	private parseChart(iexResponse: IEXChartEntry[], range: StockQueryRange) {
		let prevNum = null;
		return {
			data: iexResponse.map((entry: any) => {
				if (range === "1d") {
					let value = (entry.marketAverage <= 0 && entry.average <= 0 ? prevNum : Math.max(entry.marketAverage, entry.average));
					prevNum = value;
					return {
						label: entry.label,
						value
					};
				} else {
					return {
						label: entry.label,
						value: entry.close
					};
				}
			})
		};
	}

	runStockSearch(search: string): Observable<StockSearchResults> {
		const queryUrl = `https://virtualstocksapi.pandadevgroup.com/search/${search}`;
		return this.http.get<StockSearchResult[]>(queryUrl)
			.map(results => ({ results, search }));
	}
}
