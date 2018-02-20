import * as fromStocks from "../actions/stocks-data.actions";
import { BatchStockData } from "@app/stocks/models";

export interface StocksDataState {
	batchStocksData: BatchStockData,
	error: any
}

export const initialState: StocksDataState = {
	batchStocksData: {},
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
	}
	return state;
}

export const getBatchStocksData = (state: StocksDataState) => state.batchStocksData;
