import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromStocks from "../reducers/stocks-data.reducer";

export const getStocksDataState = createSelector(
	fromFeature.getStocksState,
	(state: fromFeature.StocksState) => state.stocksData
);

export const getBatchStocksData = createSelector(
	getStocksDataState,
	fromStocks.getBatchStocksData
);

export const getStockQuote = createSelector(
	getStocksDataState,
	fromStocks.getStockQuote
);

export const getStockChart = createSelector(
	getStocksDataState,
	fromStocks.getStockChart
);

export const getStockSearchResults = createSelector(
	getStocksDataState,
	fromStocks.getStockSearchResults
);

export const getStockError = createSelector(
	getStocksDataState,
	fromStocks.getStocksError
);
