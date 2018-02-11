import { Component } from "@angular/core";

import * as Chart from "chart.js";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent {
	ngOnInit() {
		// Enter your code here I guess for testing
		console.log(Chart);
	}
}
