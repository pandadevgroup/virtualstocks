import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromTransactions from "../reducers/transactions.reducer";

import { StockOrder } from "@app/stocks/models";

export const getTransactionsState = createSelector(
	fromFeature.getStocksState,
	state => state.transactions
);

export const getOrdersLoading = createSelector(
	getTransactionsState,
	fromTransactions.getTransactionsLoading
);
export const getOrdersError = createSelector(
	getTransactionsState,
	fromTransactions.getTransactionsError
);
