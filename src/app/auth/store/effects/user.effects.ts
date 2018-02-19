import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError, tap, share } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";

import { AuthService } from "@app/auth/services";

import * as fromActions from "../actions";

@Injectable()
export class UserEffects {
	constructor(private actions$: Actions, private authService: AuthService) {}

	@Effect()
	loginWithGoogle$ = this.actions$.ofType(fromActions.LOGIN_WITH_GOOGLE).pipe(
		map((action: fromActions.Login) => action.payload),
		switchMap(authInfo => this.authService.loginWithGoogle()),
		map(data => new fromActions.LoginWithGoogleSuccess(data)),
		catchError(error => of(new fromActions.LoginFailure(error))),
		share()
	);

	@Effect({ dispatch: false })
	logout$ = this.actions$.ofType(fromActions.LOGOUT).pipe(
		tap(() => this.authService.logout())
	);
}
