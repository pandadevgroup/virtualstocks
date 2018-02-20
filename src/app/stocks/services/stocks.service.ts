import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

import { BatchStockData } from "@app/stocks/models";

@Injectable()
export class StocksService {
	constructor(private http: HttpClient) {}

	queryBatchStockPrices(stocks: string[]): Observable<BatchStockData> {
		// Note: Each query only returns the first 100 stocks.
		const symbols = stocks.join(",");
		const queryUrl = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=price`;
		return this.http
			.get<BatchStockData>(queryUrl)
			.pipe(
				catchError(error => Observable.throw(error))
			);
	}
}
