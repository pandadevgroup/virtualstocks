import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromStocks from "@app/stocks/store";
import { Portfolio } from "@app/stocks/models";

@Component({
	templateUrl: "portfolio.component.html",
	styleUrls: ["portfolio.component.scss"]
})
export class PortfolioComponent {
	portfolio$: Observable<Portfolio>;

	constructor(private store: Store<fromStocks.StocksState>) {}

	ngOnInit() {
		this.portfolio$ = this.store.select(fromStocks.getPortfolio);
	}
}
