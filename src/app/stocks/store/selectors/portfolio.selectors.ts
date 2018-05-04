import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromStocks from "./stocks-data.selectors";
import * as fromPortfolio from "../reducers/portfolio.reducer";

import { PortfolioStock, Portfolio, StockChart, StockChartEntry } from "@app/stocks/models";

export const getPortfolioState = createSelector(
	fromFeature.getStocksState,
	state => state.portfolio
);

export const getPortfolioStockEntities = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioStockEntities
);
export const getAllPortfolioStocks = createSelector(
	getPortfolioStockEntities,
	entities => Object.values(entities)
);
export const getPortfolioLoaded = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioLoaded
);
export const getPortfolioLoading = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioLoading
);
export const getPortfolioCash = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioCash
);
export const getPortfolioError = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioError
);
export const getPortfolioChart = createSelector(
	getPortfolioStockEntities,
	fromStocks.getBatchStockChartsData,
	getPortfolioCash,
	(portfolioStocks, batchChartData, portfolioCash): StockChart => {
		if (!portfolioStocks || !batchChartData || portfolioCash == undefined) return null;

		let tickers = Object.keys(portfolioStocks);
		let finalChart: StockChartEntry[] = [];

		for (let ticker of tickers) {
			let chart = batchChartData[ticker].data;

			for (let i = 0; i < chart.length; i++) {
				if (!finalChart[i]) {
					finalChart[i] = {
						label: chart[i].label,
						value: 0
					};
				}

				finalChart[i].value += chart[i].value * portfolioStocks[ticker].quantity;
			}
		}

		for (let entry of finalChart) {
			entry.value += portfolioCash;
		}

		return {
			data: finalChart
		};
	}
);
export const getPortfolio = createSelector(
	getPortfolioCash,
	getAllPortfolioStocks,
	(cash, stocks): Portfolio => ({ cash, stocks })
);
