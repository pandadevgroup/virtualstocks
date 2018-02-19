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

// Set User
export const SET_USER = "[Auth] Set User";

export class SetUser implements Action {
	readonly type = SET_USER;
	constructor(public payload: User) {}
}

// Create User
export const CREATE_USER = "[Auth] Create User";
export const CREATE_USER_WITH_GOOGLE_AUTH = "[Auth] Create User With Google Auth";

export class CreateUser {
	readonly type = CREATE_USER;
	constructor(public payload: User) {}
}

export class CreateUserWithGoogleAuth {
	readonly type = CREATE_USER_WITH_GOOGLE_AUTH;
	constructor(public payload: any) {}
}

export type UserActions =
	| Login
	| LoginWithGoogle
	| LoginWithGoogleSuccess
	| LoginSuccess
	| LoginFailure
	| Logout
	| SetUser
	| CreateUser
	| CreateUserWithGoogleAuth;
