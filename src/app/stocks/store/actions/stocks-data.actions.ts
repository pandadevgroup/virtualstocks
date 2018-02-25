import { Action } from "@ngrx/store";

import { BatchStockData, StockDetail, StockChartRange, StockChart } from "@app/stocks/models";

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

// Stock detail
export const QUERY_STOCK_DETAIL = "[Stocks] Query Stock Detail";
export const QUERY_STOCK_DETAIL_SUCCESS = "[Stocks] Query Stock Detail Success";
export const QUERY_STOCK_DETAIL_FAIL = "[Stocks] Query Stock Detail Fail";
export const CLEAR_STOCK_DETAIL = "[Stocks] Clear Stock Detail";

export class QueryStockDetail {
	readonly type = QUERY_STOCK_DETAIL;
	constructor(public payload: string) {}
}

export class QueryStockDetailSuccess {
	readonly type = QUERY_STOCK_DETAIL_SUCCESS;
	constructor(public payload: StockDetail) {}
}

export class QueryStockDetailFail {
	readonly type = QUERY_STOCK_DETAIL_FAIL;
	constructor(public payload: any) {}
}

// Stock Chart
export const QUERY_STOCK_CHART = "[Stocks] Query Stock Chart";
export const QUERY_STOCK_CHART_SUCCESS = "[Stocks] Query Stock Chart Success";
export const QUERY_STOCK_CHART_FAIL = "[Stocks] Query Stock Chart Fail";

export class QueryStockChart {
	readonly type = QUERY_STOCK_CHART;
	constructor(public payload: { ticker, range: StockChartRange }) {}
}
export class QueryStockChartSuccess {
	readonly type = QUERY_STOCK_CHART_SUCCESS;
	constructor(public payload: StockChart) {}
}
export class QueryStockChartFail {
	readonly type = QUERY_STOCK_CHART_FAIL;
	constructor(public payload: any) {}
}

// Clear Stock
export class ClearStockDetail {
	readonly type = CLEAR_STOCK_DETAIL;
}

export type StocksDataAction =
	| QueryBatchStockPrices
	| QueryBatchStockPricesFail
	| QueryBatchStockPricesSuccess
	| QueryStockDetail
	| QueryStockDetailFail
	| QueryStockDetailSuccess
	| QueryStockChart
	| QueryStockChartSuccess
	| QueryStockChartFail
	| ClearStockDetail;
