import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Stock } from "@app/stocks";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromStocks from "@app/stocks/store";

@Component({
	templateUrl: "home.component.html",
	styleUrls: ["home.component.scss"]
})
export class HomeComponent {
	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.store.dispatch(new fromStocks.LoadPortfolio());
	}
}
