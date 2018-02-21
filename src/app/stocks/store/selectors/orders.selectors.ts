import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromOrders from "../reducers/orders.reducer";

import { StockOrder } from "@app/stocks/models";

export const getOrdersState = createSelector(
	fromFeature.getStocksState,
	state => state.orders
);

export const getOrdersLoading = createSelector(
	getOrdersState,
	fromOrders.getOrdersLoading
);
export const getOrdersError = createSelector(
	getOrdersState,
	fromOrders.getOrdersError
);
