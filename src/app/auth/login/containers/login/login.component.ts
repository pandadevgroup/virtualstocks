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

	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.subscription = this.store
			.select(fromAuth.getUserLoggedIn)
			.pipe(
				filter(loggedIn => loggedIn),
				take(1)
			)
			.subscribe(loggedIn => {
				this.store.dispatch(new fromRoot.Go({
					path: ["/home"]
				}));
			});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	login() {
		this.store.dispatch(new fromAuth.Login({
			type: "google"
		}));
	}
}
