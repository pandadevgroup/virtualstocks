export interface Stock {
	/**
	 * Stock ticker
	 * @example "NVDA", "AMZN", "GOOGL"
	 */
	ticker: string;
	companyName: string;
}

export interface StockQuote extends Stock {
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

export interface StockSearchResult {
	symbol: string;
	name: string;
	date: string;
	isEnabled: boolean;
	type: string;
	iexId: string;
}

export interface IEXDayChartEntry {
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

export interface IEXMonthChartEntry {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	unadjustedVolume: number;
	change: number;
	changePercent: number;
	vwap: number;
	label: string;
	changeOverTime: number;
}

export interface IEXDayChartEntry {
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
	marketNotional: number;
	marketNumberOfTrades: number;
	changeOverTime: number;
	marketChangeOverTime: number;
}

export type IEXChartEntry = IEXDayChartEntry | IEXMonthChartEntry;

export interface StockChartEntry {
	label: string;
	value: number;
}

export interface StockChart extends Array<StockChartEntry> {}

export type StockQueryRange = "1d" | "1m" | "3m" | "6m" | "ytd" | "1y" | "2y" | "5y";

export interface StockCompanyInfo {}

export interface StockDividendInfo {}

export interface StockEarningsInfo {}

export interface StockFinancialsInfo {}

export interface StockNews {}

export interface StockSplit {}

export interface StockInfo {
	stockQuote: StockQuote;
	stockChart: StockChart;
	stockCompanyInfo: StockCompanyInfo;
	stockDividendsInfo: StockDividendInfo[];
	stockEarningsInfo: StockEarningsInfo[];
	stockFinancialsInfo: StockFinancialsInfo[],
	stockNews: StockNews[],
	stockSplits: StockSplit[]
}

export interface QueryStockInfoOptions {
	ticker: string;
	range?: StockQueryRange;
}
