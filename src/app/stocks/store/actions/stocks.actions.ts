import { Action } from "@ngrx/store";

import { BatchStockData } from "@app/stocks/models";

// Batch stocks
export const QUERY_BATCH_STOCK_PRICES = "[Stocks] Query Batch Stock Prices";
export const QUERY_BATCH_STOCK_PRICES_SUCCESS = "[Stocks] Query Batch Stock Prices Success";
export const QUERY_BATCH_STOCK_PRICES_FAIL = "[Stocks] Query Batch Stock Prices Fail";

export class QueryBatchStockPrices {
	readonly type = QUERY_BATCH_STOCK_PRICES;
	constructor(public payload: string[]) {}
}

export class QueryBatchStockPricesSuccess {
	readonly type = QUERY_BATCH_STOCK_PRICES_SUCCESS;
	constructor(public payload: BatchStockData) {}
}

export class QueryBatchStockPricesFail {
	readonly type = QUERY_BATCH_STOCK_PRICES_FAIL;
	constructor(public payload: any) {}
}

export type StocksAction =
	| QueryBatchStockPrices
	| QueryBatchStockPricesFail
	| QueryBatchStockPricesSuccess;
