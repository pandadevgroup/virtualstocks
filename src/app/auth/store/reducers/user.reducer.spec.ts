import * as fromUser from "./user.reducer";
import * as fromActions from "../actions/user.actions";
import { User } from "@app/auth";
import { mockUser } from "@app/auth/test";

describe("User Reducer", () => {
	describe("undefined action", () => {
		it("should return the default state", () => {
			const { initialState } = fromUser;
			const action = {} as any;
			const state = fromUser.reducer(undefined, action);

			expect(state).toBe(initialState);
		});
	});

	describe("LOGIN action", () => {
		it("should set error to null", () => {
			const { initialState } = fromUser;
			const action = new fromActions.Login({
				email: "you@awesome.com",
				password: "angular"
			});
			const state = fromUser.reducer(initialState, action);

			expect(state.error).toBe(null);
			expect(state.loaded).toBe(false);
			expect(state.loggedIn).toBe(false);
			expect(state.userData).toBe(null);
		});
	});

	describe("LOGIN_SUCCESS action", () => {
		it("should update user data", () => {
			const { initialState } = fromUser;
			const action = new fromActions.LoginSuccess(mockUser);
			const state = fromUser.reducer(initialState, action);

			expect(state.loggedIn).toBe(true);
			expect(state.userData).toBe(mockUser);
			expect(state.error).toBe(null);
			expect(state.loaded).toBe(true);
		});
	});

	describe("LOGIN_FAILURE action", () => {
		it("should update error", () => {
			const { initialState } = fromUser;
			const action = new fromActions.LoginFailure("My Error");
			const state = fromUser.reducer(initialState, action);

			expect(state.loggedIn).toBe(false);
			expect(state.userData).toBe(null);
			expect(state.error).toBe("My Error");
			expect(state.loaded).toBe(false);
		});
	});

	describe("LOGOUT action", () => {
		it("should set loggedIn to false", () => {
			const { initialState } = fromUser;
			const action = new fromActions.Logout();
			const state = fromUser.reducer(initialState, action);

			expect(state.loggedIn).toBe(false);
			expect(state.userData).toBe(null);
			expect(state.error).toBe(null);
			expect(state.loaded).toBe(false);
		});
	});

	describe("SET_USER action", () => {
		it("should set userData", () => {
			const { initialState } = fromUser;
			const action = new fromActions.SetUser(mockUser);
			const state = fromUser.reducer(initialState, action);

			expect(state.loggedIn).toBe(true);
			expect(state.userData).toBe(mockUser);
			expect(state.error).toBe(null);
			expect(state.loaded).toBe(true);
		});
	});
});
