import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromPortfolio from "../reducers/portfolio.reducer";

import { PortfolioStock, Portfolio, StockChart } from "@app/stocks/models";

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
export const getPortfolioStockChartEntities = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioStockChartEntities
);
export const getAllPortfolioStockCharts = createSelector(
	getPortfolioStockChartEntities,
	entities => Object.values(entities)
);
export const getPortfolioChart = createSelector(
	getAllPortfolioStockCharts,
	(charts): StockChart => {
		return null;
	}
);
export const getPortfolio = createSelector(
	getPortfolioCash,
	getAllPortfolioStocks,
	(cash, stocks): Portfolio => ({ cash, stocks })
);
