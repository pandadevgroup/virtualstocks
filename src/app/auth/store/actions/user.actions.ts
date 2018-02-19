import { Action } from "@ngrx/store";

import { User, AuthInfo } from "@app/auth";

export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_FAILURE = "[Auth] Login Failure";

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: AuthInfo) {}
}

export class LoginSuccess implements Action {
	readonly type = LOGIN_SUCCESS;
	constructor(public payload: User) {}
}

export class LoginFailure implements Action {
	readonly type = LOGIN_FAILURE;
	constructor(public payload: any) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

export type UserActions = Login | LoginSuccess | LoginFailure | Logout;
