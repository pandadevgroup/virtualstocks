import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromTransactions from "../reducers/transactions.reducer";

import { StockOrder } from "@app/stocks/models";

export const getTransactionsState = createSelector(
	fromFeature.getStocksState,
	state => state.transactions
);

export const getTransactionsLoading = createSelector(
	getTransactionsState,
	fromTransactions.getTransactionsLoading
);
export const getTransactionsError = createSelector(
	getTransactionsState,
	fromTransactions.getTransactionsError
);
export const getTransactions = createSelector(
	getTransactionsState,
	fromTransactions.getTransactions
);
export const getTransactionsLoaded = createSelector(
	getTransactionsState,
	fromTransactions.getTransactionsLoaded
);
