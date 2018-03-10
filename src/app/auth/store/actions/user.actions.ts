import { Action } from "@ngrx/store";

import { User, AuthInfo, GoogleLoginResponse } from "@app/auth";

// Login Logout
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_FAILURE = "[Auth] Login Failure";
export const LOGIN_WITH_GOOGLE = "[Auth] Login With Google";

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

export class LoginFailure implements Action {
	readonly type = LOGIN_FAILURE;
	constructor(public payload: any) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

// Create User
export const CREATE_USER = "[Auth] Create User";
export const CREATE_USER_SUCCESS = "[Auth] Create User Success";
export const CREATE_USER_FAIL = "[Auth] Create User Fail";

export class CreateUser implements Action {
	readonly type = CREATE_USER;
	constructor(public payload: { name, email, password }) {}
}

export class CreateUserSuccess implements Action {
	readonly type = CREATE_USER_SUCCESS;
	constructor(public payload: User) {}
}

export class CreateUserFail implements Action {
	readonly type = CREATE_USER_FAIL;
	constructor(public payload: any) {}
}

// Set User
export const SET_USER = "[Auth] Set User";

export class SetUser implements Action {
	readonly type = SET_USER;
	constructor(public payload: User) {}
}

export type UserActions =
	| Login
	| LoginWithGoogle
	| LoginSuccess
	| LoginFailure
	| CreateUser
	| CreateUserSuccess
	| CreateUserFail
	| Logout
	| SetUser;
