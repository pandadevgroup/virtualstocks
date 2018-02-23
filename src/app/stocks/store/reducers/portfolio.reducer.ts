import { PortfolioStock, Portfolio } from "@app/stocks";

import * as fromPortfolio from "../actions/portfolio.actions";

export interface PortfolioState {
	stockEntities: { [ticker: string]: PortfolioStock };
	loaded: boolean;
	loading: boolean;
	cash: number;
	error: any;
}

export const initialState: PortfolioState = {
	stockEntities: {},
	loaded: false,
	loading: false,
	cash: 0,
	error: null
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
				loaded: false,
				error: action.payload
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

			const cash = portfolio.cash;

			return {
				...state,
				loading: false,
				loaded: true,
				stockEntities,
				cash,
				error: null
			}
		}
	}
	return state;
}

export const getPortfolioStockEntities = (state: PortfolioState) => state.stockEntities;
export const getPortfolioLoaded = (state: PortfolioState) => state.loaded;
export const getPortfolioLoading = (state: PortfolioState) => state.loading;
export const getPortfolioCash = (state: PortfolioState) => state.cash;
export const getPortfolioError = (state: PortfolioState) => state.error;
