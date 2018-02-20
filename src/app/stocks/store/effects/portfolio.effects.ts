import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take, filter } from "rxjs/operators";

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
				filter(portfolio => !!portfolio),
				map(portfolio => new fromActions.LoadPortfolioSuccess(portfolio)),
				catchError(error => of(new fromActions.LoadPortfolioFail(error)))
			);
		})
	);
}
