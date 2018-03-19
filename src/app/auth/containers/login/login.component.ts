import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

@Component({
	templateUrl: "login.component.html",
	styleUrls: ["login.component.scss", "../auth.styles.scss"]
})
export class LoginComponent implements OnInit {
	error$ = this.store.select(fromAuth.getUserError);
	loading$ = this.store.select(fromAuth.getUserLoading);
	rememberMe: boolean = false;
	email: string = "";

	constructor(
		private store: Store<fromRoot.State>,
		private userEffects: fromAuth.UserEffects
	) {}

	ngOnInit() {
		if (localStorage) {
			const rememberMe = localStorage.getItem("login__rememberMe");
			const email = localStorage.getItem("login__email");

			if (rememberMe) this.rememberMe = rememberMe === "true";
			if (email) this.email = email;
		}
	}

	loginWithGoogle() {
		this.store.dispatch(new fromAuth.LoginWithGoogle());
	}

	onLogin(loginInfo: { email, password, rememberMe }) {
		const rememberMe = loginInfo.rememberMe;
		if (rememberMe && localStorage) {
			if (rememberMe) {
				localStorage.setItem("login__rememberMe", rememberMe);
				localStorage.setItem("login__email", loginInfo.email);
			} else {
				localStorage.removeItem("login__rememberMe");
				localStorage.removeItem("login__email");
			}
		}
		this.store.dispatch(new fromAuth.Login(loginInfo));
	}
}
