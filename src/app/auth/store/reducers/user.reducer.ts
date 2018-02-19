import * as fromUser from "../actions/user.actions";
import { AuthInfo, User } from "@app/auth";

export interface UserState {
	userData: User;
	loggedIn: boolean;
	error: any;
}

export const initialState: UserState = {
	userData: null,
	loggedIn: false,
	error: null
};

export function reducer(state = initialState, action: fromUser.UserActions): UserState {
	switch (action.type) {
		case fromUser.LOGIN: {
			return {
				...state,
				error: null
			};
		}
		case fromUser.LOGIN_SUCCESS: {
			const userData = action.payload;

			return {
				...state,
				userData,
				loggedIn: true,
				error: null
			};
		}
		case fromUser.LOGIN_FAILURE: {
			const error = action.payload;

			return {
				...state,
				loggedIn: false,
				error
			}
		}
		case fromUser.LOGOUT: {
			return {
				...state,
				loggedIn: false,
				error: null
			}
		}
	}

	return state;
}

export const getUserData = (state: UserState) => state.userData;
export const getUserLoggedIn = (state: UserState) => state.loggedIn;
export const getUserError = (state: UserState) => state.error;
