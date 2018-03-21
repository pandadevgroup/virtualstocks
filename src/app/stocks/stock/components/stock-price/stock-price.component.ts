import { Component, Input } from "@angular/core";

import { StockQuote } from "@app/stocks/models";

@Component({
	selector: "vs-stock-price",
	templateUrl: "stock-price.component.html",
	styleUrls: ["stock-price.component.scss"]
})
export class StockPriceComponent {
	@Input() stockQuote: StockQuote;
}
