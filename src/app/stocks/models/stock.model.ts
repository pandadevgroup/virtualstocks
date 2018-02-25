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

export interface StockChartDataPoint {
	date: string;
	minute: string;
	label: string;
	high: number;
	low: number;
	average: number;
	volume: number;
	notional: number;
	numberOfTrades: number;
	marketHigh: number;
	marketLow: number;
	marketAverage: number;
	marketVolume: number;
	marketNotional: number;
	marketNumberOfTrades: number;
	changeOverTime: number;
	marketChangeOverTime: number;
}

export interface StockChart extends Array<StockChartDataPoint> {}

export type StockChartRange = "1d" | "1m" | "3m" | "6m" | "ytd" | "1y" | "2y" | "5y";
