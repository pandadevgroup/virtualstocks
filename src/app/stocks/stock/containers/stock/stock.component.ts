import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { switchMap, tap, filter, map } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { StockDetail } from "@app/stocks/models";
import * as fromStocks from "@app/stocks/store";
import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent implements OnInit, OnDestroy {
	stock$: Observable<StockDetail>;

	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.stock$ = this.store.select(fromRoot.getRouterState).pipe(
			map(state => state.state.params.ticker),
			filter(ticker => !!ticker),
			tap((ticker) => this.store.dispatch(new fromStocks.QueryStockDetail(ticker))),
			switchMap(() => this.store.select(fromStocks.getStockDetail))
		);


	}

	buyStock() {
		this.store.select(fromAuth.getUserData).pipe(
			map(user => user.id),
			map(uid => {
				this.store.dispatch(new fromStocks.BuyStock({
					uid,
					ticker: "AMZN",
					quantity: 10
				}))
			})
		).subscribe();
	}

	ngOnDestroy() {
		this.store.dispatch(new fromStocks.ClearStockDetail());
	}
}
