import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromStocks from "@app/stocks/store";

@Component({
	templateUrl: "orders.component.html",
	styleUrls: ["orders.component.scss"]
})
export class OrdersComponent {
	constructor(private store: Store<fromStocks.StocksState>) {}
}
