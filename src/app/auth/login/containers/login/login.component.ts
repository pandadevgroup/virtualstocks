import { Component } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromStore from "@app/auth/store";

@Component({
	templateUrl: "login.component.html",
	styleUrls: ["login.component.scss"]
})
export class LoginComponent {
	constructor(private store: Store<fromStore.AuthState>) {}

	ngOnInit() {
		this.store.dispatch(new fromStore.Login({
			type: "google"
		}));
	}
}
