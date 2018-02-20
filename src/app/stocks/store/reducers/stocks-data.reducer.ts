import * as fromStocks from "../actions/stocks-data.actions";
import { BatchStockData, StockDetail } from "@app/stocks/models";

export interface StocksDataState {
	batchStocksData: BatchStockData,
	stockDetail: StockDetail,
	error: any
}

export const initialState: StocksDataState = {
	batchStocksData: {},
	stockDetail: null,
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
		case fromStocks.CLEAR_STOCK_DETAIL: {
			return {
				...state,
				stockDetail: null
			};
		}
	}
	return state;
}

export const getBatchStocksData = (state: StocksDataState) => state.batchStocksData;
export const getStocksDetail = (state: StocksDataState) => state.stockDetail;
export const getStocksError = (state: StocksDataState) => state.error;
