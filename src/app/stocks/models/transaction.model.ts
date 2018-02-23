export interface Transaction {
	fulfilled: boolean;
	fulfillmentTimestamp?: number;
	price?: number;
	limitPrice?: number;
	quantity: number;
	ticker: string;
	type: TransactionType;
	uid: string;
}

export class TransactionType {
	static BUY = "buy";
	static LIMIT = "limit";
	static SHORT = "short";
	static SELL = "sell";
}
