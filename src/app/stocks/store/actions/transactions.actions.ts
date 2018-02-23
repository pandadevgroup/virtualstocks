import { Action } from "@ngrx/store";

import { StockTransactionPayload } from "@app/stocks/models";

// Stock Transaction
export const STOCK_TRANSACTION = "[Stocks] Stock Transaction";
export const STOCK_TRANSACTION_SUCCESS = "[Stocks] Stock Transaction Success";
export const STOCK_TRANSACTION_FAIL = "[Stocks] Stock Transaction Fail";

export class StockTransaction implements Action {
	readonly type = STOCK_TRANSACTION;
	constructor(public payload: StockTransactionPayload) {}
}
export class StockTransactionSuccess implements Action {
	readonly type = STOCK_TRANSACTION_SUCCESS;
}
export class StockTransactionFail implements Action {
	readonly type = STOCK_TRANSACTION_FAIL;
	constructor(public payload: any) {}
}

export type OrdersAction =
	| StockTransaction
	| StockTransactionSuccess
	| StockTransactionFail;
