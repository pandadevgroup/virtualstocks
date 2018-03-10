import { Component } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

@Component({
	templateUrl: "login.component.html",
	styleUrls: ["login.component.scss", "../auth.styles.scss"]
})
export class LoginComponent {
	error$ = this.store.select(fromAuth.getUserError);

	constructor(
		private store: Store<fromRoot.State>,
		private userEffects: fromAuth.UserEffects
	) {}

	loginWithGoogle() {
		this.store.dispatch(new fromAuth.LoginWithGoogle());
	}

	onLogin(loginInfo: { email, password, rememberMe }) {
		// TODO: handle rememberMe
		this.store.dispatch(new fromAuth.Login(loginInfo));
	}
}
