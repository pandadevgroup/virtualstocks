import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Stock } from "@app/stocks";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromStocks from "@app/stocks/store";
import * as fromPortfolio from "@app/stocks/store/reducers/portfolio.reducer";

@Component({
	templateUrl: "home.component.html",
	styleUrls: ["home.component.scss"]
})
export class HomeComponent {
	portfolio$: Observable<fromPortfolio.PortfolioState>;

	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.portfolio$ = this.store.select(fromStocks.getPortfolioState);
	}
}
