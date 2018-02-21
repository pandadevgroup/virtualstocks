import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPortfolio from "./portfolio.reducer";
import * as fromStocks from "./stocks-data.reducer";
import * as fromOrders from "./orders.reducer";

export interface StocksState {
	portfolio: fromPortfolio.PortfolioState,
	stocksData: fromStocks.StocksDataState,
	orders: fromOrders.OrdersState
}

export const reducers: ActionReducerMap<StocksState> = {
	portfolio: fromPortfolio.reducer,
	stocksData: fromStocks.reducer,
	orders: fromOrders.reducer
}

export const getStocksState = createFeatureSelector<StocksState>("stocks");
