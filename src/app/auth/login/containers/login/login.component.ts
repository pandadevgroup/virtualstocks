import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";

import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

import { Subscription } from "rxjs/Subscription";
import { filter, take } from "rxjs/operators";

@Component({
	templateUrl: "login.component.html",
	styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
	subscription: Subscription;

	constructor(
		private store: Store<fromRoot.State>,
		private userEffects: fromAuth.UserEffects
	) {}

	ngOnInit() {
		this.subscription = this.userEffects.loginWithGoogle$.subscribe(result => {
			if (result.type !== fromAuth.LOGIN_WITH_GOOGLE_SUCCESS) return;
			const { user, googleResponse } = result.payload;

			console.log(user, googleResponse);

			this.store.dispatch(
				new fromRoot.Go({
					path: ["/home"]
				})
			);
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	login() {
		this.store.dispatch(new fromAuth.LoginWithGoogle());
	}
}
