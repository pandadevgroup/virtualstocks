import { Component } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

@Component({
	templateUrl: "login.component.html",
	styleUrls: ["login.component.scss", "../auth.styles.scss"]
})
export class LoginComponent {

	constructor(
		private store: Store<fromRoot.State>,
		private userEffects: fromAuth.UserEffects
	) {}

	login() {
		this.store.dispatch(new fromAuth.LoginWithGoogle());
	}
}
