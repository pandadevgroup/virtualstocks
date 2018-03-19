import * as fromStocks from "../actions/stocks-data.actions";
import { BatchStockData, StockInfo, StockChart, StockSearchResult } from "@app/stocks/models";

export interface StocksDataState {
	batchStocksData: BatchStockData,
	stockInfo: StockInfo,
	stockSearchResults: StockSearchResult[],
	error: any
}

export const initialState: StocksDataState = {
	batchStocksData: {},
	stockInfo: null,
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
		case fromStocks.QUERY_STOCK_INFO_SUCCESS: {
			return {
				...state,
				stockInfo: action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_STOCK_INFO_FAIL: {
			return {
				...state,
				stockInfo: null,
				error: action.payload
			};
		}
		case fromStocks.CLEAR_STOCK_INFO: {
			return {
				...state,
				error: null,
				stockInfo: null
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
export const getStockInfo = (state: StocksDataState) => state.stockInfo;
export const getStocksError = (state: StocksDataState) => state.error;
export const getStockSearchResults = (state: StocksDataState) => state.stockSearchResults;
