import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { AuthService } from "@app/auth";

import * as fromActions from "../actions";

@Injectable()
export class UserEffects {
	constructor(private actions$: Actions, private authService: AuthService) {}

	@Effect()
	login$ = this.actions$.ofType(fromActions.LOGIN).pipe(
		map((action: fromActions.Login) => action.payload),
		switchMap(authInfo => this.authService.login(authInfo)),
		map(user => new fromActions.LoginSuccess(user)),
		catchError(error => of(new fromActions.LoginFailure(error)))
	);
}
