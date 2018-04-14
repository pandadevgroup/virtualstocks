export interface StockTransaction {
	fulfilled: boolean;
	timestamp: number;
	fulfillmentTimestamp?: number;
	price?: number;
	limitPrice?: number;
	quantity: number;
	ticker: string;
	type: StockTransactionType;
	uid: string;
}

export class StockTransactionType {
	static BUY = "buy";
	static LIMIT = "limit";
	static SHORT = "short";
	static SELL = "sell";
}
