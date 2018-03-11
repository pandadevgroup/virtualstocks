import { Component } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

@Component({
	templateUrl: "register.component.html",
	styleUrls: ["register.component.scss", "../auth.styles.scss"]
})
export class RegisterComponent {
	error$ = this.store.select(fromAuth.getUserError);
	loading$ = this.store.select(fromAuth.getUserLoading);

	constructor(
		private store: Store<fromRoot.State>,
		private userEffects: fromAuth.UserEffects
	) {}

	loginWithGoogle() {
		this.store.dispatch(new fromAuth.LoginWithGoogle());
	}

	register(info: { name, email, password }) {
		this.store.dispatch(new fromAuth.CreateUser(info));
	}
}
