import { PortfolioStock } from "./portfolio-stock.model";

export interface Portfolio {
	stocks: PortfolioStock[];
	cash: number;
}

export interface PortfolioChart {
	tickers: PortfolioChartTicker[];
}

export interface PortfolioChartTicker {
	ticker: string;
	data: PortfolioChartTickerData[];
}

export interface PortfolioChartTickerData {
	label: string;
	value: number;
}
