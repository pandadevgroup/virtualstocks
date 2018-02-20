import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError, tap } from "rxjs/operators";
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
			catchError(error => of(new fromActions.LoginFailure(error)))
		);

	@Effect()
	loginWithGoogleSuccess$ = this.actions$
		.ofType(fromActions.LOGIN_WITH_GOOGLE_SUCCESS)
		.pipe(
			map((action: fromActions.LoginWithGoogleSuccess) => action.payload),
			map((data: GoogleLoginResponse) => {
				if (data.user === null) {
					// User doesn't exist, create one
					return new fromActions.CreateUserWithGoogleAuth(data.googleResponse.user);
				} else {
					return new fromRoot.Go({
						path: ["/home"]
					});
				}
			})
		);

	@Effect()
	createUserWithGoogleAuth$ = this.actions$
		.ofType(fromActions.CREATE_USER_WITH_GOOGLE_AUTH)
		.pipe(
			map((action: fromActions.CreateUserWithGoogleAuth) => action.payload),
			map(data => new fromActions.CreateUser({
				id: data.uid,
				name: data.displayName,
				email: data.email
			}))
		);

	@Effect()
	createUser$ = this.actions$
		.ofType(fromActions.CREATE_USER)
		.pipe(
			map((action: fromActions.CreateUser) => action.payload),
			switchMap(data => this.authService.createUser(data)),
			map(data => new fromActions.CreateUserSuccess(data)),
			catchError(error => of(new fromActions.CreateUserFail(error))),
		);

	@Effect({ dispatch: false })
	logout$ = this.actions$
		.ofType(fromActions.LOGOUT)
		.pipe(tap(() => this.authService.logout()));
}
