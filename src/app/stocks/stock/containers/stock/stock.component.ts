import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { Store } from "@ngrx/store";

import { StockDetail } from "@app/stocks/models";
import * as fromStore from "@app/stocks/store";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent implements OnInit, OnDestroy {
	stock$: Observable<StockDetail>;

	constructor(private store: Store<fromStore.StocksState>) {}

	ngOnInit() {
		this.store.dispatch(new fromStore.QueryCurrentStockDetail());
		this.stock$ = this.store.select(fromStore.getStockDetail);
	}

	ngOnDestroy() {
		this.store.dispatch(new fromStore.ClearStockDetail());
	}
}
