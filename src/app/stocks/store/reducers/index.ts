import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPortfolio from "./portfolio.reducer";
import * as fromStocks from "./stocks.reducer";

export interface StocksState {
	portfolio: fromPortfolio.PortfolioState,
	stocks: fromStocks.StocksState
}

export const reducers: ActionReducerMap<StocksState> = {
	portfolio: fromPortfolio.reducer,
	stocks: fromStocks.reducer
}

export const getStocksState = createFeatureSelector<StocksState>("stocks");
