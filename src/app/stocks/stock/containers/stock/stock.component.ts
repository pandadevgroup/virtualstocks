import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { switchMap, tap, filter, map } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { StockInfo, StockTransactionType, StockChart, StockQuote, StockCompanyInfo, StockDividendInfo, StockEarningsInfo, StockFinancialsInfo, StockNews, StockSplit, StockQueryRange, StockStats } from "@app/stocks/models";
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
	stockQuote$: Observable<StockQuote> = this.store.select(fromStocks.getStockQuote);
	stockChart$: Observable<StockChart> = this.store.select(fromStocks.getStockChart);
	company$: Observable<StockCompanyInfo> = this.store.select(fromStocks.getStockCompanyInfo);
	dividends$: Observable<StockDividendInfo[]> = this.store.select(fromStocks.getStockDividendsInfo);
	earnings$: Observable<StockEarningsInfo[]> = this.store.select(fromStocks.getStockEarningsInfo);
	financials$: Observable<StockFinancialsInfo[]> = this.store.select(fromStocks.getStockFinancialsInfo);
	stats$: Observable<StockStats> = this.store.select(fromStocks.getStockStats);
	news$: Observable<StockNews[]> = this.store.select(fromStocks.getStockNews);
	splits$: Observable<StockSplit[]> = this.store.select(fromStocks.getStockSplits);
	user$: Observable<User> = this.store.select(fromAuth.getUserData);
	queryRange$: Observable<StockQueryRange> = this.store.select(fromStocks.getStockQueryRange);
	private ngUnsubscribe: Subject<any> = new Subject();
	private ticker: string;

	constructor(
		private store: Store<fromRoot.State>
	) {}

	ngOnInit() {
		this.store.select(fromRoot.getRouterState).pipe(
			map(state => state.state.params.ticker),
			filter(ticker => !!ticker),
			tap(ticker => this.ticker = ticker),
		).takeUntil(this.ngUnsubscribe).subscribe(ticker => {
			this.store.dispatch(new fromStocks.QueryStockInfo({ ticker }));
			this.store.dispatch(new fromStocks.SetQueryRange("1m"));
		});
	}

	onTransaction({ stock, type, uid, quantity }) {
		this.store.dispatch(new fromStocks.NewStockTransaction({
			uid,
			ticker: stock.ticker,
			quantity,
			type,
			timestamp: Date.now()
		}));
	}

	updateQueryRange(queryRange: StockQueryRange) {
		this.store.dispatch(new fromStocks.SetQueryRange(queryRange));
		this.store.dispatch(new fromStocks.QueryStockChart({
			ticker: this.ticker,
			range: queryRange
		}));
	}

	ngOnDestroy() {
		this.store.dispatch(new fromStocks.ClearStockInfo());
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
