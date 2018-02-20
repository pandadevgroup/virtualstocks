import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError, tap, filter, take } from "rxjs/operators";
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
			switchMap(authInfo => this.authService.loginWithGoogle().pipe(
				switchMap(() => this.authService.user),
				filter(user => !!user),
				take(1),
				map(user => new fromActions.LoginSuccess(user)),
				catchError(error => of(new fromActions.LoginFailure(error)))
			))
		);

	@Effect()
	loginSuccess$ = this.actions$
		.ofType(fromActions.LOGIN_SUCCESS)
		.pipe(
			map(() => new fromRoot.Go({
				path: ["/home"]
			}))
		);

	@Effect({ dispatch: false })
	logout$ = this.actions$
		.ofType(fromActions.LOGOUT)
		.pipe(tap(() => this.authService.logout()));
}
