import { PortfolioStock, Portfolio } from "@app/stocks/models";

import * as fromPortfolio from "../actions/portfolio.actions";

export interface PortfolioState {
	stockEntities: { [ticker: string]: PortfolioStock };
	loaded: boolean;
	loading: boolean;
	value: number;
}

export const initialState: PortfolioState = {
	stockEntities: {},
	loaded: false,
	loading: false,
	value: 0
};

export function reducer(state = initialState, action: fromPortfolio.PortfolioAction): PortfolioState {
	switch(action.type) {
		case fromPortfolio.LOAD_PORTFOLIO: {
			return {
				...state,
				loading: true
			};
		}

		case fromPortfolio.LOAD_PORTFOLIO_FAIL: {
			return {
				...state,
				loading: false,
				loaded: false
			}
		}

		case fromPortfolio.LOAD_PORTFOLIO_SUCCESS: {
			const portfolio = action.payload;

			const stockEntities = portfolio.stocks.reduce((
				entities: { [ticker: string]: PortfolioStock }, stock
			) => {
				entities[stock.ticker] = stock;
				return entities;
			}, {});

			const value = portfolio.value;

			return {
				...state,
				loading: false,
				loaded: true,
				stockEntities,
				value
			}
		}
	}
	return state;
}

export const getPortfolioStockEntities = (state: PortfolioState) => state.stockEntities;
export const getPortfolioLoaded = (state: PortfolioState) => state.loaded;
export const getPortfolioLoading = (state: PortfolioState) => state.loading;
export const getPortfolioValue = (state: PortfolioState) => state.value;
