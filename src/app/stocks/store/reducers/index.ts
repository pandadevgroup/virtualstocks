import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPortfolio from "./portfolio.reducer";

export interface StocksState {
	portfolio: fromPortfolio.PortfolioState
}

export const reducers: ActionReducerMap<StocksState> = {
	portfolio: fromPortfolio.reducer
}

export const getStocksState = createFeatureSelector<StocksState>("stocks");
