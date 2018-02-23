import { StoreModule, Store, combineReducers } from "@ngrx/store";

import { TestBed } from "@angular/core/testing";

import { User } from "@app/auth";

import * as fromReducers from "../reducers";
import * as fromActions from "../actions";
import * as fromSelectors from "./user.selectors";

import { mockUser } from "@app/auth/test";

describe("User Selectors", () => {
	let store: Store<fromReducers.AuthState>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot({
					auth: combineReducers(fromReducers.reducers)
				})
			]
		});

		store = TestBed.get(Store);
	});

	describe("getUserState", () => {
		it("should return state of user store slice", () => {
			let result;

			store.select(fromSelectors.getUserState).subscribe(val => result = val);

			expect(result).toEqual({
				userData: null,
				loggedIn: false,
				loaded: false,
				error: null
			});

			store.dispatch(new fromActions.LoginSuccess(mockUser));

			expect(result).toEqual({
				userData: mockUser,
				loggedIn: true,
				loaded: true,
				error: null
			});
		});
	});

	describe("getUserData", () => {
		it("should get user data", () => {
			let result;
			store.select(fromSelectors.getUserData).subscribe(data => result = data);

			store.dispatch(new fromActions.LoginSuccess(mockUser));

			expect(result).toEqual(mockUser);

			const mockUser2 = {
				id: "anotherfakeid",
				name: "Angular",
				email: "angular@angular.io"
			};
			store.dispatch(new fromActions.SetUser(mockUser2));

			expect(result).toEqual(mockUser2);
		});
	});

	describe("getUserError", () => {
		it("should get user error", () => {
			let result;
			store.select(fromSelectors.getUserError).subscribe(error => result = error);

			store.dispatch(new fromActions.LoginFailure("My Error"));

			expect(result).toEqual("My Error");

			store.dispatch(new fromActions.LoginSuccess(mockUser));

			expect(result).toBe(null);
		});
	});

	describe("getUserLoggedIn", () => {
		it("should get user logged in", () => {
			let result;
			store.select(fromSelectors.getUserLoggedIn).subscribe(loggedIn => result = loggedIn);

			store.dispatch(new fromActions.LoginSuccess(mockUser));

			expect(result).toEqual(true);

			store.dispatch(new fromActions.Logout());

			expect(result).toEqual(false);
		});
	});

	describe("getUserLoaded", () => {
		it("should get user loaded", () => {
			let result;
			store.select(fromSelectors.getUserLoaded).subscribe(loaded => result = loaded);

			expect(result).toEqual(false);

			store.dispatch(new fromActions.SetUser(null));

			expect(result).toEqual(true);
		});
	});
});
