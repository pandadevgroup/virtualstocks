export interface Stock {
	/**
	 * Stock ticker
	 * @example "NVDA", "AMZN", "GOOGL"
	 */
	ticker: string;
	companyName: string;
}

export interface BatchStockData {
	[ticker: string]: {
		price: number
	}
}
