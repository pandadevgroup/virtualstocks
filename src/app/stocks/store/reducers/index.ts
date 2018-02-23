import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPortfolio from "./portfolio.reducer";
import * as fromStocks from "./stocks-data.reducer";
import * as fromTransactions from "./transactions.reducer";

export interface StocksState {
	portfolio: fromPortfolio.PortfolioState,
	stocksData: fromStocks.StocksDataState,
	transactions: fromTransactions.TransactionsState
}

export const reducers: ActionReducerMap<StocksState> = {
	portfolio: fromPortfolio.reducer,
	stocksData: fromStocks.reducer,
	transactions: fromTransactions.reducer
}

export const getStocksState = createFeatureSelector<StocksState>("stocks");
