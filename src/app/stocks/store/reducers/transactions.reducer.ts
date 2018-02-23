import * as fromTransactions from "../actions/transactions.actions";
import { StockTransaction } from "@app/stocks/models";

export interface TransactionsState {
	loading: boolean;
	loaded: boolean;
	transactions: StockTransaction[];
	error: any;
}

export const initialState: TransactionsState = {
	loading: false,
	loaded: false,
	transactions: [],
	error: null
};

export function reducer(state = initialState, action: fromTransactions.OrdersAction): TransactionsState {
	switch(action.type) {
		case fromTransactions.STOCK_TRANSACTION:
		case fromTransactions.LOAD_TRANSACTIONS: {
			return {
				...state,
				loading: true
			};
		}
		case fromTransactions.STOCK_TRANSACTION_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null
			};
		}
		case fromTransactions.LOAD_TRANSACTIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				transactions: action.payload
			}
		}
		case fromTransactions.STOCK_TRANSACTION_FAIL:
		case fromTransactions.LOAD_TRANSACTIONS_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload
			};
		}
	}
	return state;
}

export const getTransactionsLoading = (state: TransactionsState) => state.loading;
export const getTransactionsError = (state: TransactionsState) => state.error;
export const getTransactions = (state: TransactionsState) => state.transactions;
export const getTransactionsLoaded = (state: TransactionsState) => state.loaded;
