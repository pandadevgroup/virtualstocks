import { PortfolioStock, Portfolio } from "@app/stocks/models";

import * as fromPortfolio from "../actions/portfolio.actions";

export interface PortfolioState {
	entities: { [ticker: string]: PortfolioStock };
	loaded: boolean;
	loading: boolean;
	totalValue: number;
}

export const initialState: PortfolioState = {
	entities: {},
	loaded: false,
	loading: false,
	totalValue: 0
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

			const entities = portfolio.stocks.reduce((
				entities: { [ticker: string]: PortfolioStock }, stock
			) => {
				entities[stock.ticker] = stock;
				return entities;
			}, {});

			const totalValue = portfolio.totalValue;

			return {
				...state,
				loading: false,
				loaded: true,
				entities,
				totalValue
			}
		}
	}
	return state;
}
