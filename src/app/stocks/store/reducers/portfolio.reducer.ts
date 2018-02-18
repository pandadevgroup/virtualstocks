import { PortfolioStock, Portfolio } from "@app/stocks/models";

import * as fromPortfolio from "../actions/portfolio.action";

export interface PortfolioState extends Portfolio {
	loaded: boolean;
	loading: boolean;
}

export const initialState: PortfolioState = {
	stocks: [],
	loaded: false,
	loading: false,
	totalValue: 0
};

export function reducer(state = initialState, action: fromPortfolio.PortfolioAction): PortfolioState {

	return state;
}
