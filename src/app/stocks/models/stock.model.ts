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

export interface StockChart {
	close?: number;
	ticker?: string;
	data: StockChartEntry[];
}

export type StockQueryRange = "1d" | "1m" | "3m" | "6m" | "ytd" | "1y" | "2y" | "5y";

export interface StockCompanyInfo {
	ticker: string;
	companyName: string;
	exchange: string;
	industry: string;
	website: string;
	description: string;
	CEO: string;
	sector: string;
	/**
	 * Refers to the common issue type of the stock.
	 * ad – American Depository Receipt (ADR’s)
	 * -re – Real Estate Investment Trust (REIT’s)
	 * ce – Closed end fund (Stock and Bond Fund)
	 * si – Secondary Issue
	 * lp – Limited Partnerships
	 * cs – Common Stock
	 * et – Exchange Traded Fund (ETF)
	 * (blank) = Not Available, i.e., Warrant, Note, or (non-filing) Closed Ended Funds
	 */
	issueType: "ad" | "re" | "ce" | "si" | "lp" | "cs" | "et" | "";
}

export interface StockDividendInfo {
	exDate: string;
	paymentDate: string;
	recordDate: string;
	declaredDate: string;
	amount: number;
	/**
	 * refers to the dividend flag
	 * FI = Final dividend, div ends or instrument ends,
	 * LI = Liquidation, instrument liquidates,
	 * PR = Proceeds of a sale of rights or shares,
	 * RE = Redemption of rights,
	 * AC = Accrued dividend,
	 * AR = Payment in arrears,
	 * AD = Additional payment,
	 * EX = Extra payment,
	 * SP = Special dividend,
	 * YE = Year end,
	 * UR = Unknown rate,
	 * SU = Regular dividend is suspended
	 */
	flag: "FI" | "LI" | "PR" | "RE" | "AC" | "AR" | "AD" | "EX" | "SP" | "YE" | "UR" | "SU";
	/**
	 * refers to the dividend payment type
	 * (Dividend income, Interest income, Stock dividend, Short term capital gain,
	 * Medium term capital gain, Long term capital gain, Unspecified term capital gain)
	 */
	type: string;
	/**
	 * refers to the dividend income type
	 * P = Partially qualified income
	 * Q = Qualified income
	 * N = Unqualified income
	 * null = N/A or unknown
	 */
	qualified: string | null;
	indicated: number;
}

export interface StockEarningsInfo {
	actualEPS: number;
	consensusEPS: number;
	estimatedEPS: number;
	announceTime: string;
	numberOfEstimates: number;
	EPSSurpriseDollar: number;
	EPSReportDate: string;
	fiscalPeriod: string;
	fiscalEndDate: string;
}

export interface StockFinancialsInfo {
	reportDate: string;
	grossProfit: number;
	costOfRevenue: number;
	operatingRevenue: number;
	totalRevenue: number;
	operatingIncome: number;
	netIncome: number;
	researchAndDevelopment: number;
	operatingExpense: number;
	currentAssets: number;
	totalAssets: number;
	totalLiabilities: number;
	currentCash: number;
	currentDebt: number;
	totalCash: number;
	totalDebt: number;
	shareholderEquity: number;
	cashChange: number;
	cashFlow: number;
	operatingGainsLosses: string;
}

export interface StockNews {
	datetime: string;
	headline: string;
	source: string;
	url: string;
	summary: string;
	related: string;
}

export interface StockSplit {
	exDate: string;
	delcaredDate: string;
	recordDate: string;
	paymentDate: string;
	ratio: number;
	toFactor: string;
	forFactor: string;
}

export interface StockStats {
	companyName: string;
	marketcap: number;
	beta: number;
	week52high: number;
	week52low: number;
	week52change: number;
	shortInterest: number;
	shortDate: string;
	dividendRate: number;
	dividendYield: number;
	exDividendDate: string;
	latestEPS: number;
	latestEPSDate: string;
	sharesOutstanding: number;
	float; number;
	returnOnEquity: number;
	consensusEPS: number;
	numberOfEstimates: number;
	ticker: string;
	EBITDA: number;
	revenue: number;
	grossProfit: number;
	cash: number;
	debt: number;
	ttmEPS: number;
	revenuePerShare: number;
	revenuePerEmployee: number;
	peRatioHigh: number;
	peRatioLow: number;
	EPSSurpriseDollar: number;
	EPSSurprisePercent: number;
	returnOnAssets: number;
	returnOnCapital: number;
	profitMargin: number;
	priceToSales: number;
	priceToBook: number;
	day200MovingAvg: number;
	day50MovingAvg: number;
	institutionPercent: number;
	insiderPercent: number;
	shortRatio: number;
	year5ChangePercent: number;
	year2ChangePercent: number;
	year1ChangePercent: number;
	ytdChangePercent: number;
	month6ChangePercent: number;
	month3ChangePercent: number;
	month1ChangePercent: number;
	day5ChangePercent: number;
}

export interface StockInfo {
	stockQuote: StockQuote;
	stockChart: StockChart;
	stockCompanyInfo: StockCompanyInfo;
	stockDividendsInfo: StockDividendInfo[];
	stockEarningsInfo: StockEarningsInfo[];
	stockFinancialsInfo: StockFinancialsInfo[],
	stockNews: StockNews[],
	stockSplits: StockSplit[],
	stockStats: StockStats
}

export interface QueryStockInfoOptions {
	ticker: string;
	range?: StockQueryRange;
}
