import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromUser from "../reducers/user.reducer";

import { AuthInfo, User } from "@app/auth";

export const getUserState = createSelector(
	fromFeature.getAuthState,
	state => state.user
);

export const getUserData = createSelector(getUserState, fromUser.getUserData);
export const getUserError = createSelector(getUserState, fromUser.getUserError);
export const getUserLoggedIn = createSelector(getUserState, fromUser.getUserLoggedIn);
export const getUserLoading = createSelector(getUserState, fromUser.getUserLoading);
export const getUserLoaded = createSelector(getUserState, fromUser.getUserLoaded);
