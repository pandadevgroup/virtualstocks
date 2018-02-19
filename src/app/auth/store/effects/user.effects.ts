import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { AuthService } from "@app/auth/services";

import * as fromActions from "../actions";

@Injectable()
export class UserEffects {
	constructor(private actions$: Actions, private authService: AuthService) {}

	@Effect()
	login$ = this.actions$.ofType(fromActions.LOGIN).pipe(
		map((action: fromActions.Login) => action.payload),
		switchMap(authInfo => this.authService.login(authInfo)),
		catchError(error => of(new fromActions.LoginFailure(error)))
	);

	@Effect({ dispatch: false })
	logout$ = this.actions$.ofType(fromActions.LOGOUT).pipe(
		tap(() => this.authService.logout())
	);
}
