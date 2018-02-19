import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromAuth from "@app/auth";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {

	loggedIn: boolean = false;
	private ngUnsubscribe = new Subject();

	constructor(
		private store: Store<fromAuth.AuthState>,
		private authService: fromAuth.AuthService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.authService.user.takeUntil(this.ngUnsubscribe).subscribe(user => {
			this.store.dispatch(new fromAuth.UpdateUser(user));
		});
		this.store
			.select(fromAuth.getUserLoggedIn)
			.takeUntil(this.ngUnsubscribe)
			.subscribe(loggedIn => {
				this.loggedIn = loggedIn;
				this.cd.markForCheck();
			});
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
