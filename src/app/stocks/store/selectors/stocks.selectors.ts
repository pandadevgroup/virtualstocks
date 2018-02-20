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
