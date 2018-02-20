import { Action } from "@ngrx/store";

import { Portfolio } from "@app/stocks/models";

// Load portfolio
export const LOAD_PORTFOLIO = "[Stocks] Load Portfolio";
export const LOAD_PORTFOLIO_FAIL = "[Stocks] Load Portfolio Fail";
export const LOAD_PORTFOLIO_SUCCESS = "[Stocks] Load Portfolio Success";

export class LoadPortfolio implements Action {
	readonly type = LOAD_PORTFOLIO;
}

export class LoadPortfolioFail implements Action {
	readonly type = LOAD_PORTFOLIO_FAIL;
	constructor(public payload: any) {}
}

export class LoadPortfolioSuccess implements Action {
	readonly type = LOAD_PORTFOLIO_SUCCESS;
	constructor(public payload: Portfolio) {}
}

// Create Portfolio
export const CREATE_PORTFOLIO = "[Stocks] Create Portfolio";
export const CREATE_PORTFOLIO_SUCCESS = "[Stocks] Create Portfolio Success";
export const CREATE_PORTFOLIO_FAIL = "[Stocks] Create Portfolio Fail";
export class CreatePortfolio implements Action {
	readonly type = CREATE_PORTFOLIO;
	constructor(public payload: string) {}
}
export class CreatePortfolioSuccess implements Action {
	readonly type = CREATE_PORTFOLIO_SUCCESS;
	constructor(public payload: Portfolio) {}
}
export class CreatePortfolioFail implements Action {
	readonly type = CREATE_PORTFOLIO_FAIL;
	constructor(public payload: any) {}
}

export type PortfolioAction =
	| LoadPortfolio
	| LoadPortfolioFail
	| LoadPortfolioSuccess
	| CreatePortfolio
	| CreatePortfolioSuccess
	| CreatePortfolioFail;
