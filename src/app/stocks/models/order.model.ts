import { StockTransactionType } from "./transaction.model";

export interface StockOrder {
	uid: string;
	ticker: string;
	quantity: number;
	fulfilled: boolean;
	type: StockTransactionType;
	limitPrice?: number;
	timestamp: number;
}

export interface StockTransactionPayload {
	uid: string;
	ticker: string;
	quantity: number;
	type: StockTransactionType;
	limitPrice?: number;
	timestamp: number;
}
