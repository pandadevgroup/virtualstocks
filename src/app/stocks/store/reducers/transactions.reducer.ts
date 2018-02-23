import * as fromTransactions from "../actions/transactions.actions";

export interface TransactionsState {
	loading: boolean;
	error: any;
}

export const initialState: TransactionsState = {
	loading: false,
	error: null
};

export function reducer(state = initialState, action: fromTransactions.OrdersAction): TransactionsState {
	switch(action.type) {
		case fromTransactions.STOCK_TRANSACTION: {
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
		case fromTransactions.STOCK_TRANSACTION_FAIL: {
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
