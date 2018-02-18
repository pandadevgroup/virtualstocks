export interface PortfolioStock {
	/**
	 * Stock ticker
	 * @example "NVDA", "AMZN", "GOOGL"
	 */
	ticker: string;
	/** Number of stocks owned */
	quantity: number;
	/** Initial total price paid for stocks */
	purchaseValue: number;
	/** Current value of stocks */
	currentValue: number;
}
