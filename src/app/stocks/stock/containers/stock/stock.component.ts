import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { switchMap, tap, filter, map } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { StockInfo, StockTransactionType, StockChart, StockQuote, StockCompanyInfo, StockDividendInfo, StockEarningsInfo, StockFinancialsInfo, StockNews, StockSplit } from "@app/stocks/models";
import * as fromStocks from "@app/stocks/store";
import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";
import { User } from "@app/auth";
import { Subject } from "rxjs/Subject";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent implements OnInit, OnDestroy {
	stockQuote$: Observable<StockQuote>;
	stockChart$: Observable<StockChart>;
	company$: Observable<StockCompanyInfo>;
	dividends$: Observable<StockDividendInfo[]>;
	earnings$: Observable<StockEarningsInfo[]>;
	financials$: Observable<StockFinancialsInfo[]>;
	news$: Observable<StockNews[]>;
	splits$: Observable<StockSplit[]>;
	user$: Observable<User>;
	private ngUnsubscribe: Subject<any> = new Subject();

	constructor(
		private store: Store<fromRoot.State>
	) {}

	ngOnInit() {
		this.store.select(fromRoot.getRouterState).pipe(
			map(state => state.state.params.ticker),
			filter(ticker => !!ticker)
		).takeUntil(this.ngUnsubscribe).subscribe(ticker => {
			this.store.dispatch(new fromStocks.QueryStockInfo({ ticker }))
		});

		this.stockQuote$ = this.store.select(fromStocks.getStockQuote);
		this.stockChart$ = this.store.select(fromStocks.getStockChart);
		this.company$ = this.store.select(fromStocks.getStockCompanyInfo);
		this.dividends$ = this.store.select(fromStocks.getStockDividendsInfo);
		this.earnings$ = this.store.select(fromStocks.getStockEarningsInfo);
		this.financials$ = this.store.select(fromStocks.getStockFinancialsInfo);
		this.news$ = this.store.select(fromStocks.getStockNews);
		this.splits$ = this.store.select(fromStocks.getStockSplits);
		this.user$ = this.store.select(fromAuth.getUserData);
	}

	onTransaction({ stock, type, uid, quantity }) {
		this.store.dispatch(new fromStocks.NewStockTransaction({
			uid,
			ticker: stock.ticker,
			quantity,
			type
		}));
	}

	ngOnDestroy() {
		this.store.dispatch(new fromStocks.ClearStockInfo());
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
