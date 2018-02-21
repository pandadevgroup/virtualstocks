import * as fromOrders from "../actions/orders.actions";

export interface OrdersState {
	loading: boolean;
	error: any;
}

export const initialState: OrdersState = {
	loading: false,
	error: null
};

export function reducer(state = initialState, action: fromOrders.OrdersAction): OrdersState {
	switch(action.type) {
		case fromOrders.BUY_STOCK: {
			return {
				...state,
				loading: true
			};
		}
		case fromOrders.BUY_STOCK_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null
			};
		}
		case fromOrders.BUY_STOCK_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload
			};
		}
	}
	return state;
}

export const getOrdersLoading = (state: OrdersState) => state.loading;
export const getOrdersError = (state: OrdersState) => state.error;
