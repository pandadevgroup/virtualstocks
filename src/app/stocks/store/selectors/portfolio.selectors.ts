import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromPortfolio from "../reducers/portfolio.reducer";

import { PortfolioStock, Portfolio } from "@app/stocks/models";

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
export const getPortfolioValue = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioValue
);
export const getPortfolioError = createSelector(
	getPortfolioState,
	fromPortfolio.getPortfolioError
);
