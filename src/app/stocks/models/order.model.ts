export interface StockOrder {
	uid: string;
	ticker: string;
	quantity: number;
	fulfilled: boolean;
}

export interface BuyStockOrder {
	uid: string;
	ticker: string;
	quantity: number;
}
