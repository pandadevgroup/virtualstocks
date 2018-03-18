import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { BatchStockData, StockDetail, StockChart, StockChartRange, IEXMonthChartEntry, StockSearchResult } from "@app/stocks/models";

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

	getStockDetail(ticker: string): Observable<StockDetail> {
		const queryUrl = `https://api.iextrading.com/1.0/stock/${ticker}/quote`;
		return this.http
			.get<any>(queryUrl)
			.pipe(
				map(response => {
					const { symbol: ticker, ...data } = response;
					return {
						ticker, ...data
					};
				})
			);
	}

	getStockChart(ticker: string, range: StockChartRange = "1m"): Observable<StockChart> {
		const queryUrl = `https://api.iextrading.com/1.0/stock/${ticker}/chart/${range}`;

		if (range != "1m") throw "Error: Write code for range != 1m";

		return this.http
			.get<IEXMonthChartEntry[]>(queryUrl).pipe(
				map(entries => entries.map(entry => {
					return {
						label: entry.label,
						value: entry.close
					}
				}))
			);
	}

	runStockSearch(search: string): Observable<StockSearchResult[]> {
		const queryUrl = `http://api.virtualstocks.pandadevgroup.com/search/${search}`;
		return this.http.get<StockSearchResult[]>(queryUrl);
	}
}
