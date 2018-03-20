import { Action } from "@ngrx/store";

import { BatchStockData, StockQuote, StockQueryRange, StockChart, StockSearchResult, StockInfo, QueryStockInfoOptions } from "@app/stocks/models";

// Stock Search
export const STOCK_SEARCH = "[Stocks] Stock Search";
export const STOCK_SEARCH_SUCCESS = "[Stocks] Stock Search Success";
export const STOCK_SEARCH_FAIL = "[Stocks] Stock Search Fail";
export const CLEAR_STOCK_SEARCH = "[Stocks] Clear Stock Search";

export class StockSearch {
	readonly type = STOCK_SEARCH;
	constructor(public payload: string) {}
}

export class StockSearchSuccess {
	readonly type = STOCK_SEARCH_SUCCESS;
	constructor(public payload: StockSearchResult[]) {}
}

export class StockSearchFail {
	readonly type = STOCK_SEARCH_FAIL;
	constructor(public payload: any) {}
}

export class ClearStockSearch {
	readonly type = CLEAR_STOCK_SEARCH;
}

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

// Stock info
export const QUERY_STOCK_INFO = "[Stocks] Query Stock Info";
export const QUERY_STOCK_INFO_SUCCESS = "[Stocks] Query Stock Info Success";
export const QUERY_STOCK_INFO_FAIL = "[Stocks] Query Stock Info Fail";
export const CLEAR_STOCK_INFO = "[Stocks] Clear Stock Info";

export class QueryStockInfo {
	readonly type = QUERY_STOCK_INFO;
	constructor(public payload: QueryStockInfoOptions) {}
}

export class QueryStockInfoSuccess {
	readonly type = QUERY_STOCK_INFO_SUCCESS;
	constructor(public payload: StockInfo) {}
}

export class QueryStockInfoFail {
	readonly type = QUERY_STOCK_INFO_FAIL;
	constructor(public payload: any) {}
}

export class ClearStockInfo {
	readonly type = CLEAR_STOCK_INFO;
}

// Stock Chart
export const QUERY_STOCK_CHART = "[Stocks] Query Stock Chart";
export const QUERY_STOCK_CHART_SUCCESS = "[Stocks] Query Stock Chart Success";
export const QUERY_STOCK_CHART_FAIL = "[Stocks] Query Stock Chart Fail";

export class QueryStockChart {
	readonly type = QUERY_STOCK_CHART;
	constructor(public payload: { ticker, range: StockQueryRange }) {}
}

export class QueryStockChartSuccess {
	readonly type = QUERY_STOCK_CHART_SUCCESS;
	constructor(public payload: StockChart) {}
}

export class QueryStockChartFail {
	readonly type = QUERY_STOCK_CHART_FAIL;
	constructor(public payload: any) {}
}

// Query Range
export const SET_QUERY_RANGE = "[Stocks] Set Query Range";

export class SetQueryRange {
	readonly type = SET_QUERY_RANGE;
	constructor(public payload: StockQueryRange) {}
}

export type StocksDataAction =
	| StockSearch
	| StockSearchSuccess
	| StockSearchFail
	| ClearStockSearch
	| QueryBatchStockPrices
	| QueryBatchStockPricesFail
	| QueryBatchStockPricesSuccess
	| QueryStockInfo
	| QueryStockInfoSuccess
	| QueryStockInfoFail
	| ClearStockInfo
	| QueryStockChart
	| QueryStockChartSuccess
	| QueryStockChartFail
	| SetQueryRange;
