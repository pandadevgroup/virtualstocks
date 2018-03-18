import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth";
import * as fromStocks from "@app/stocks/store";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

	loggedIn: boolean = false;
	sidebarSmall = false;
	sidebarMobile = false;
	private ngUnsubscribe = new Subject();

	constructor(
		private store: Store<fromRoot.State>,
		private authService: fromAuth.AuthService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.authService.user.takeUntil(this.ngUnsubscribe).subscribe(user => {
			this.store.dispatch(new fromAuth.SetUser(user));
		});
		this.store
			.select(fromAuth.getUserLoggedIn)
			.takeUntil(this.ngUnsubscribe)
			.subscribe(loggedIn => {
				this.loggedIn = loggedIn;
				this.cd.markForCheck();
			});
	}

	onStockSearch(ticker) {
		this.store.dispatch(new fromRoot.Go({
			path: ["stock", ticker]
		}));
	}

	onPartialStockSearch(search) {
		if (search == "") this.store.dispatch(new fromStocks.ClearStockSearch());
		else this.store.dispatch(new fromStocks.StockSearch(search));
	}

	toggleSidebar() {
		this.sidebarSmall = !this.sidebarSmall;
	}

	toggleSidebarMobile() {
		this.sidebarMobile = !this.sidebarMobile;
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
