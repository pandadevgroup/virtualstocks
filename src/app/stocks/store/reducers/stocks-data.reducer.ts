import * as fromStocks from "../actions/stocks-data.actions";
import { BatchStockData, StockDetail, StockChart, StockSearchResult } from "@app/stocks/models";

export interface StocksDataState {
	batchStocksData: BatchStockData,
	stockDetail: StockDetail,
	stockChart: StockChart,
	stockSearchResults: StockSearchResult[],
	error: any
}

export const initialState: StocksDataState = {
	batchStocksData: {},
	stockDetail: null,
	stockChart: null,
	stockSearchResults: [],
	error: null
};

export function reducer(state = initialState, action: fromStocks.StocksDataAction): StocksDataState {
	switch (action.type) {
		case fromStocks.QUERY_BATCH_STOCK_PRICES_SUCCESS: {
			return {
				...state,
				batchStocksData: action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_BATCH_STOCK_PRICES_FAIL: {
			return {
				...state,
				error: action.payload
			};
		}
		case fromStocks.QUERY_STOCK_DETAIL_SUCCESS: {
			return {
				...state,
				stockDetail: action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_STOCK_DETAIL_FAIL: {
			return {
				...state,
				stockDetail: null,
				error: action.payload
			};
		}
		case fromStocks.QUERY_STOCK_CHART_SUCCESS: {
			return {
				...state,
				stockChart: action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_STOCK_CHART_FAIL: {
			return {
				...state,
				stockChart: null,
				error: action.payload
			};
		}
		case fromStocks.CLEAR_STOCK_DETAIL: {
			return {
				...state,
				error: null,
				stockDetail: null,
				stockChart: null
			};
		}
		case fromStocks.STOCK_SEARCH_SUCCESS: {
			return {
				...state,
				error: null,
				stockSearchResults: action.payload
			};
		}
		case fromStocks.STOCK_SEARCH_FAIL: {
			return {
				...state,
				error: action.payload
			}
		}
		case fromStocks.CLEAR_STOCK_SEARCH: {
			return {
				...state,
				error: null,
				stockSearchResults: []
			};
		}
	}
	return state;
}

export const getBatchStocksData = (state: StocksDataState) => state.batchStocksData;
export const getStocksDetail = (state: StocksDataState) => state.stockDetail;
export const getStocksChart = (state: StocksDataState) => state.stockChart;
export const getStocksError = (state: StocksDataState) => state.error;
export const getStockSearchResults = (state: StocksDataState) => state.stockSearchResults;
