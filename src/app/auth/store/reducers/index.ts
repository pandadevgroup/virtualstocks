import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromUser from "./user.reducer";

export interface AuthState {
	user: fromUser.UserState
}

export const reducers: ActionReducerMap<AuthState> = {
	user: fromUser.reducer,
};

export const getAuthState = createFeatureSelector<AuthState>("auth");
