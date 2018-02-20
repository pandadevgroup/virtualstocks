import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take } from "rxjs/operators";

import * as fromActions from "../actions";
import { PortfolioService } from "@app/stocks/services";
import { AuthService } from "@app/auth";

@Injectable()
export class PortfolioEffects {
	constructor(
		private actions$: Actions,
		private portfolioService: PortfolioService,
		private authService: AuthService
	) {}

	@Effect()
	loadPortfolio$ = this.actions$.ofType(fromActions.LOAD_PORTFOLIO).pipe(
		switchMap(() => this.authService.userId.pipe(take(1))),
		switchMap(id => {
			return this.portfolioService.getPortfolio(id).pipe(
				map(portfolio => {
					if (portfolio == null) {
						return new fromActions.CreatePortfolio(id);
					}
					return new fromActions.LoadPortfolioSuccess(portfolio);
				}),
				catchError(error => of(new fromActions.LoadPortfolioFail(error)))
			);
		})
	);

	@Effect()
	createPortfolio$ = this.actions$
		.ofType(fromActions.CREATE_PORTFOLIO)
		.pipe(
			switchMap((action: fromActions.CreatePortfolio) =>
				this.portfolioService.createPortfolio(action.payload).pipe(
					map(portfolio => new fromActions.CreatePortfolioSuccess(portfolio)),
					catchError(error => of(new fromActions.CreatePortfolioFail(error)))
				)
			)
		);

	@Effect()
	createPortfolioSuccess$ = this.actions$
		.ofType(fromActions.CREATE_PORTFOLIO_SUCCESS)
		.pipe(
			map((action: fromActions.CreatePortfolioSuccess) =>
				new fromActions.LoadPortfolioSuccess(action.payload))
		);
}
