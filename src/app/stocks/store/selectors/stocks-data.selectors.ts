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

export const getStockCompanyInfo = createSelector(
	getStocksDataState,
	fromStocks.getStockCompanyInfo
);

export const getStockDividendsInfo = createSelector(
	getStocksDataState,
	fromStocks.getStockDividendsInfo
);

export const getStockEarningsInfo = createSelector(
	getStocksDataState,
	fromStocks.getStockEarningsInfo
);

export const getStockFinancialsInfo = createSelector(
	getStocksDataState,
	fromStocks.getStockFinancialsInfo
);

export const getStockNews = createSelector(
	getStocksDataState,
	fromStocks.getStockNews
);

export const getStockSplits = createSelector(
	getStocksDataState,
	fromStocks.getStockSplits
);

export const getStockStats = createSelector(
	getStocksDataState,
	fromStocks.getStockStats
);

export const getStockSearchResults = createSelector(
	getStocksDataState,
	fromStocks.getStockSearchResults
);

export const getStockQueryRange = createSelector(
	getStocksDataState,
	fromStocks.getStockQueryRange
);

export const getStockError = createSelector(
	getStocksDataState,
	fromStocks.getStocksError
);
