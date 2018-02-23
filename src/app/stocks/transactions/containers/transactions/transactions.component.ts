import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromStocks from "@app/stocks/store";

@Component({
	templateUrl: "transactions.component.html",
	styleUrls: ["transactions.component.scss"]
})
export class TransactionsComponent {
	constructor(private store: Store<fromStocks.StocksState>) {}
}
