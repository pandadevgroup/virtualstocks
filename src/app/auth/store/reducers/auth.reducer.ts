import * as fromAuth from "../actions/auth.actions";
import { AuthInfo, User } from "@app/auth";

export interface AuthState {
	user: User;
	loggedIn: boolean;
	error: any;
}

export const initialState: AuthState = {
	user: null,
	loggedIn: false,
	error: null
};

export function reducer(state = initialState, action: fromAuth.AuthActions): AuthState {
	switch (action.type) {
		case fromAuth.LOGIN: {
			return {
				...state,
				error: null
			};
		}
		case fromAuth.LOGIN_SUCCESS: {
			const user = action.payload;

			return {
				...state,
				user,
				loggedIn: true,
				error: null
			};
		}
		case fromAuth.LOGIN_FAILURE: {
			const error = action.payload;

			return {
				...state,
				loggedIn: false,
				error
			}
		}
		case fromAuth.LOGOUT: {
			return {
				...state,
				loggedIn: false,
				error: null
			}
		}
	}

	return state;
}

export const getAuthUser = (state: AuthState) => state.user;
export const getAuthLoggedIn = (state: AuthState) => state.loggedIn;
export const getAuthError = (state: AuthState) => state.error;
