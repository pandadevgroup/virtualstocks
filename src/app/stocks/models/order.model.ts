import { TransactionType } from "./transaction.model";

export interface StockOrder {
	uid: string;
	ticker: string;
	quantity: number;
	fulfilled: boolean;
	type: TransactionType;
	limitPrice?: number;
}

export interface StockTransactionPayload {
	uid: string;
	ticker: string;
	quantity: number;
	type: TransactionType;
	limitPrice?: number;
}
