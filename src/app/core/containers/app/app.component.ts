import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromAuth from "@app/auth";

import { Subscription } from "rxjs/Subscription";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	constructor(
		private store: Store<fromAuth.AuthState>,
		private authService: fromAuth.AuthService
	) {}

	authSubscription$: Subscription;

	ngOnInit() {
		this.authSubscription$ = this.authService.user.subscribe(user => {
			this.store.dispatch(new fromAuth.UpdateUser(user));
		});
	}

	ngOnDestroy() {
		this.authSubscription$.unsubscribe();
	}
}
