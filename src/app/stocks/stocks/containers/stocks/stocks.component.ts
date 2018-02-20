import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Stock, PortfolioStock } from "@app/stocks";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromStocks from "@app/stocks/store";
import * as fromPortfolio from "@app/stocks/store/reducers/portfolio.reducer";

import { tap } from "rxjs/operators";

@Component({
	templateUrl: "stocks.component.html",
	styleUrls: ["stocks.component.scss"]
})
export class StocksComponent {
	portfolio$: Observable<fromPortfolio.PortfolioState>;
	stocks$: Observable<PortfolioStock[]>;

	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.portfolio$ = this.store.select(fromStocks.getPortfolioState);
		this.stocks$ = this.store.select(fromStocks.getAllPortfolioStocks).pipe(
			tap(stocks => {
				const stockTickers = stocks.map(stock => stock.ticker);
				this.store.dispatch(new fromStocks.QueryBatchStockPrices(stockTickers));
			})
		);
	}
}
