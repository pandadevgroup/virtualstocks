import * as fromUser from "./user.actions";

describe("User Actions", () => {
	describe("Auth Actions", () => {
		describe("Login", () => {
			it("should create an action", () => {
				const authInfo = {
					email: "you@awesome.com",
					password: "angular"
				};
				const action = new fromUser.Login(authInfo);

				expect({ ...action }).toEqual({
					type: fromUser.LOGIN,
					payload: authInfo
				});
			});
		});

		describe("LoginSuccess", () => {
			it("should create an action", () => {
				const user = {
					id: "fakeuserid",
					name: "Nathan Wang",
					email: "nathan.r.wang@gmail.com"
				};
				const action = new fromUser.LoginSuccess(user);

				expect({ ...action }).toEqual({
					type: fromUser.LOGIN_SUCCESS,
					payload: user
				});
			});
		});

		describe("LoginWithGoogle", () => {
			it("should create an action", () => {
				const action = new fromUser.LoginWithGoogle();
				expect({ ...action }).toEqual({
					type: fromUser.LOGIN_WITH_GOOGLE
				});
			});
		});

		describe("LoginFailure", () => {
			it("should create an action", () => {
				const action = new fromUser.LoginFailure("My Error Message");
				expect({ ...action }).toEqual({
					type: fromUser.LOGIN_FAILURE,
					payload: "My Error Message"
				});
			});
		});

		describe("Logout", () => {
			it("should create an action", () => {
				const action = new fromUser.Logout();
				expect({ ...action }).toEqual({
					type: fromUser.LOGOUT
				});
			});
		});
	});

	describe("Set User", () => {
		describe("SetUser", () => {
			it("should create an action", () => {
				const user = {
					id: "fakeuserid",
					name: "Nathan Wang",
					email: "nathan.r.wang@gmail.com"
				};
				const action = new fromUser.SetUser(user);

				expect({ ...action }).toEqual({
					type: fromUser.SET_USER,
					payload: user
				});
			});
		});
	});
});
