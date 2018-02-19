import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError, tap, share } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { empty } from "rxjs/observable/empty";

import { AuthService } from "@app/auth/services";

import * as fromRoot from "@app/core/store";
import * as fromActions from "../actions";

import { GoogleLoginResponse } from "@app/auth";

@Injectable()
export class UserEffects {
	constructor(private actions$: Actions, private authService: AuthService) {}

	@Effect()
	loginWithGoogle$ = this.actions$
		.ofType(fromActions.LOGIN_WITH_GOOGLE)
		.pipe(
			map((action: fromActions.Login) => action.payload),
			switchMap(authInfo => this.authService.loginWithGoogle()),
			map(data => new fromActions.LoginWithGoogleSuccess(data)),
			catchError(error => of(new fromActions.LoginFailure(error))),
			share()
		);

	@Effect()
	loginWithGoogleSuccess$ = this.actions$
		.ofType(fromActions.LOGIN_WITH_GOOGLE_SUCCESS)
		.pipe(
			map((action: fromActions.LoginWithGoogleSuccess) => action.payload),
			map((data: GoogleLoginResponse) => {
				if (data.user === null) {
					// User doesn't exist, create one
					return new fromActions.CreateUserWithGoogleAuth(data.googleResponse);
				} else {
					return new fromRoot.Go({
						path: ["/home"]
					});
				}
			})
		);

	@Effect({ dispatch: false })
	logout$ = this.actions$
		.ofType(fromActions.LOGOUT)
		.pipe(tap(() => this.authService.logout()));
}
