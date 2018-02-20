import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPortfolio from "./portfolio.reducer";
import * as fromStocks from "./stocks-data.reducer";

export interface StocksState {
	portfolio: fromPortfolio.PortfolioState,
	stocksData: fromStocks.StocksDataState
}

export const reducers: ActionReducerMap<StocksState> = {
	portfolio: fromPortfolio.reducer,
	stocksData: fromStocks.reducer
}

export const getStocksState = createFeatureSelector<StocksState>("stocks");
