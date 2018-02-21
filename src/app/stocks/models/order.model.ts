export interface StockOrder {
	uid: string;
	ticker: string;
	quantity: number;
	fulfilled: boolean;
}
