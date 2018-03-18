import { Component, Input } from "@angular/core";

import { StockDetail } from "@app/stocks/models";

@Component({
	selector: "vs-stock-title",
	templateUrl: "stock-title.component.html",
	styleUrls: ["stock-title.component.scss"]
})
export class StockTitleComponent {
	@Input() stock: StockDetail;
}
