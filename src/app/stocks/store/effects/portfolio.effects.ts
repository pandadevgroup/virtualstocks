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
		switchMap(() => this.authService.user.pipe(take(1))),
		map(user => {
			if (user) return user.id;
			throw { message: "You are not signed in." };
		}),
		switchMap(id => this.portfolioService.getPortfolio(id)),
		map(portfolio => new fromActions.LoadPortfolioSuccess(portfolio)),
		catchError(error => of(new fromActions.LoadPortfolioFail(error)))
	)
}
