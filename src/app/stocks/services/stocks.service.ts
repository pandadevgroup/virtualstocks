import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { BatchStockData, StockInfo, StockQuote, StockChart, StockQueryRange, IEXMonthChartEntry, StockSearchResult, QueryStockInfoOptions, IEXDayChartEntry, IEXChartEntry } from "@app/stocks/models";

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
				+ `quote,chart,company,dividends,earnings,financials,news,splits&range=${range}`;
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
						stockSplits: response.splits
					};
				})
			);
	}

	getStockChart(ticker: string, range: StockQueryRange = "1m"): Observable<StockChart> {
		const queryUrl = `https://api.iextrading.com/1.0/stock/${ticker}/chart/${range}`;

		return this.http
			.get<IEXChartEntry[]>(queryUrl).pipe(
				map(response => this.parseChart(response, range))
			);
	}

	private parseSymbol(iexResponse: any) {
		const { symbol: ticker, ...data } = iexResponse;
		return {
			ticker, ...data
		};
	}

	private parseChart(iexResponse: IEXChartEntry[], range: StockQueryRange) {
		let valueKey = "close";
		if (range === "1d") valueKey = "average";
		return iexResponse.map(entry => ({
			label: entry.label,
			value: entry[valueKey]
		}));
	}

	runStockSearch(search: string): Observable<StockSearchResult[]> {
		const queryUrl = `https://virtualstocksapi.pandadevgroup.com/search/${search}`;
		return this.http.get<StockSearchResult[]>(queryUrl);
	}
}
