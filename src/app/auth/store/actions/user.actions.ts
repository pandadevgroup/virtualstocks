import { Action } from "@ngrx/store";

import { User, AuthInfo } from "@app/auth";

// Login Logout
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const LOGIN_FAILURE = "[Auth] Login Failure";

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: AuthInfo) {}
}

export class LoginFailure implements Action {
	readonly type = LOGIN_FAILURE;
	constructor(public payload: any) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

// Update User
export const UPDATE_USER = "[Auth] Update User";

export class UpdateUser implements Action {
	readonly type = UPDATE_USER;
	constructor(public payload: User) {}
}

export type UserActions =
	| Login
	| LoginFailure
	| Logout
	| UpdateUser;
