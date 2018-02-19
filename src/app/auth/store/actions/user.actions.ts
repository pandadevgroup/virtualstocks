import { Action } from "@ngrx/store";

import { User, AuthInfo, GoogleLoginResponse } from "@app/auth";

// Login Logout
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_FAILURE = "[Auth] Login Failure";
export const LOGIN_WITH_GOOGLE = "[Auth] Login With Google";
export const LOGIN_WITH_GOOGLE_SUCCESS = "[Auth] Login With Google Success";

export class Login implements Action {
	readonly type = LOGIN;
	constructor(public payload: AuthInfo) {}
}

export class LoginSuccess implements Action {
	readonly type = LOGIN_SUCCESS;
	constructor(public payload: User) {}
}

export class LoginWithGoogle implements Action {
	readonly type = LOGIN_WITH_GOOGLE;
}

export class LoginWithGoogleSuccess implements Action {
	readonly type = LOGIN_WITH_GOOGLE_SUCCESS;
	constructor(public payload: GoogleLoginResponse) {}
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
	| LoginWithGoogle
	| LoginWithGoogleSuccess
	| LoginSuccess
	| LoginFailure
	| Logout
	| UpdateUser;
