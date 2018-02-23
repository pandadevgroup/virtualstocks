import { Action } from "@ngrx/store";

import { StockTransactionPayload, StockTransaction } from "@app/stocks/models";

// New Stock Transaction
export const STOCK_TRANSACTION = "[Stocks] New Stock Transaction";
export const STOCK_TRANSACTION_SUCCESS = "[Stocks] New Stock Transaction Success";
export const STOCK_TRANSACTION_FAIL = "[Stocks] New Stock Transaction Fail";

export class NewStockTransaction implements Action {
	readonly type = STOCK_TRANSACTION;
	constructor(public payload: StockTransactionPayload) {}
}
export class NewStockTransactionSuccess implements Action {
	readonly type = STOCK_TRANSACTION_SUCCESS;
}
export class NewStockTransactionFail implements Action {
	readonly type = STOCK_TRANSACTION_FAIL;
	constructor(public payload: any) {}
}

// Load Transactions
export const LOAD_TRANSACTIONS = "[Stocks] Load Transactions";
export const LOAD_TRANSACTIONS_SUCCESS = "[Stocks] Load Transactions Success";
export const LOAD_TRANSACTIONS_FAIL = "[Stocks] Load Transactions Fail";

export class LoadTransactions implements Action {
	readonly type = LOAD_TRANSACTIONS;
}
export class LoadTransactionsSuccess implements Action {
	readonly type = LOAD_TRANSACTIONS_SUCCESS;
	constructor(public payload: StockTransaction[]) {}
}
export class LoadTransactionsFail implements Action {
	readonly type = LOAD_TRANSACTIONS_FAIL;
	constructor(public payload: any) {}
}

export type OrdersAction =
	| NewStockTransaction
	| NewStockTransactionSuccess
	| NewStockTransactionFail
	| LoadTransactions
	| LoadTransactionsSuccess
	| LoadTransactionsFail;
