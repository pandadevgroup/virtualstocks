export interface Stock {
	/**
	 * Stock ticker
	 * @example "NVDA", "AMZN", "GOOGL"
	 */
	ticker: string;
	companyName: string;
}

export interface StockDetail extends Stock {
	primaryExchange: string;
	sector: string;
	calculationPrice: string;
	open: number;
	openTime: number;
	close: number;
	closeTime: number;
	high: number;
	low: number;
	latestPrice: number;
	latestSource: string;
	latestTime: string;
	latestUpdate: number;
	latestVolume: number;
	iexRealtimePrice: number;
	iexRealtimeSize: number;
	iexLastUpdated: number;
	delayedPrice: number;
	delayedPriceTime: number;
	previousClose: number;
	change: number;
	changePercent: number;
	iexMarketPercent: number;
	iexVolume: number;
	avgTotalVolume: number;
	iexBidPrice: number;
	iexBidSize: number;
	iexAskPrice: number;
	iexAskSize: number;
	marketCap: number;
	peRatio: number;
	week52High: number;
	week52Low: number;
	ytdChange: number;
}

export interface BatchStockData {
	[ticker: string]: {
		price: number
	}
}
