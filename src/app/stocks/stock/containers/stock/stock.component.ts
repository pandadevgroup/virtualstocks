import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import * as Chart from "chart.js";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent {
	stock$: Observable<any>;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		// Enter your code here I guess for testing
		console.log(Chart);

		this.stock$ = this.route.paramMap
			.switchMap((params: ParamMap) => {
				const ticker = params.get("ticker");
				return Observable.of({ ticker });
			});
	}
}
