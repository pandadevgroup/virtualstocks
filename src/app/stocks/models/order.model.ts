export interface StockOrder {
	uid: string;
	ticker: string;
	quantity: number;
	fulfilled: boolean;
	error: string | null;
	type: StockOrderType;
}

export interface StockTransactionPayload {
	uid: string;
	ticker: string;
	quantity: number;
	type: StockOrderType;
}

export class StockOrderType {
	static BUY = "buy";
	static LIMIT = "limit";
	static SHORT = "short";
	static SELL = "sell";
}
