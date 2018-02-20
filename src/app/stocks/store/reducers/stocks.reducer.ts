import * as fromStocks from "../actions/stocks.actions";
import { BatchStockData } from "@app/stocks/models";

export interface StocksState {
	batchStocksData: BatchStockData,
	error: any
}

export const initialState: StocksState = {
	batchStocksData: {},
	error: null
};

export function reducer(state = initialState, action: fromStocks.StocksAction): StocksState {
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
	}
	return state;
}

export const getBatchStocksData = (state: StocksState) => state.batchStocksData;
