import { Component } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromAuth from "@app/auth/store";

@Component({
	templateUrl: "login.component.html",
	styleUrls: ["login.component.scss"]
})
export class LoginComponent {
	constructor(private store: Store<fromAuth.AuthState>) {}

	login() {
		this.store.dispatch(new fromAuth.Login({
			type: "google"
		}));
	}
}
