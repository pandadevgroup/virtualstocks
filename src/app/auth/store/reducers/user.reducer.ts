import * as fromUser from "../actions/user.actions";
import { AuthInfo, User } from "@app/auth";

export interface UserState {
	userData: User;
	loggedIn: boolean;
	loading: boolean;
	loaded: boolean;
	error: any;
}

export const initialState: UserState = {
	userData: null,
	loggedIn: false,
	loading: false,
	loaded: false,
	error: null
};

export function reducer(state = initialState, action: fromUser.UserActions): UserState {
	switch (action.type) {
		case fromUser.LOGIN:
		case fromUser.CREATE_USER:
		case fromUser.LOGIN_WITH_GOOGLE: {
			return {
				...state,
				error: null,
				loading: true
			};
		}
		case fromUser.LOGIN_SUCCESS:
		case fromUser.CREATE_USER_SUCCESS: {
			const userData = action.payload;

			return {
				...state,
				userData,
				loggedIn: !!userData,
				loaded: true,
				loading: false,
				error: null
			};
		}
		case fromUser.LOGIN_FAILURE:
		case fromUser.CREATE_USER_FAIL: {
			const error = action.payload;

			return {
				...state,
				loading: false,
				error
			};
		}
		case fromUser.LOGOUT: {
			return {
				...state,
				loggedIn: false,
				userData: null,
				error: null
			};
		}
		case fromUser.SET_USER: {
			const userData = action.payload;

			return {
				...state,
				loggedIn: !!userData,
				loaded: true,
				userData
			};
		}
	}

	return state;
}

export const getUserData = (state: UserState) => state.userData;
export const getUserLoggedIn = (state: UserState) => state.loggedIn;
export const getUserError = (state: UserState) => state.error;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUserLoading = (state: UserState) => state.loading;
