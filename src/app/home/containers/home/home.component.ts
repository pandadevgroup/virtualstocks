import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Stock, PortfolioStock, BatchStockData, Portfolio } from "@app/stocks";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromStocks from "@app/stocks/store";

import { tap } from "rxjs/operators";

@Component({
	templateUrl: "home.component.html",
	styleUrls: ["home.component.scss"]
})
export class HomeComponent {
	portfolio$: Observable<Portfolio>;
	stocks$: Observable<PortfolioStock[]>;
	stockPrices$: Observable<BatchStockData>;

	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.portfolio$ = this.store.select(fromStocks.getPortfolio);
		this.stocks$ = this.store.select(fromStocks.getAllPortfolioStocks).pipe(
			tap(stocks => {
				const stockTickers = stocks.map(stock => stock.ticker);
				this.store.dispatch(new fromStocks.QueryBatchStockPrices(stockTickers));
			})
		);
		this.stockPrices$ = this.store.select(fromStocks.getBatchStocksData);
	}
}
