import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { BatchStockData } from "@app/stocks/models";

@Injectable()
export class StocksService {
	constructor() {}

	queryBatchStockPrices(stocks): Observable<BatchStockData> {
		return Observable.of({});
	}
}
