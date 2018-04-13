import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromStocks from "@app/stocks/store";
import { Portfolio, PortfolioStock, BatchStockData } from "@app/stocks/models";
import { tap } from "rxjs/operators";

@Component({
	templateUrl: "portfolio.component.html",
	styleUrls: ["portfolio.component.scss"]
})
export class PortfolioComponent {
	portfolio$: Observable<Portfolio>;
	stocks$: Observable<PortfolioStock[]>;
	stockPrices$: Observable<BatchStockData>;

	constructor(private store: Store<fromStocks.StocksState>) {}

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
