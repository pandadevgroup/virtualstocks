import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from "@angular/router";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromRouter from "@ngrx/router-store";

import * as authActions from "@app/auth/store/actions";

export interface RouterStateUrl {
	url: string;
	queryParams: Params;
	params: Params;
}

export interface State {
	router: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
	router: fromRouter.routerReducer
};

export function logoutMetaReducer(reducer) {
	return function(state, action) {
		return reducer(action.type === authActions.LOGOUT ? undefined : state, action);
	};
}
export const metaReducers = [
	logoutMetaReducer
];

export const getRouterState = createFeatureSelector<
	fromRouter.RouterReducerState<RouterStateUrl>
>("router");

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		const { url } = routerState;
		const { queryParams } =  routerState.root;

		let state: ActivatedRouteSnapshot = routerState.root;
		while (state.firstChild) {
			state = state.firstChild;
		}
		const { params } = state;

		return { url, queryParams, params };
	}
}
