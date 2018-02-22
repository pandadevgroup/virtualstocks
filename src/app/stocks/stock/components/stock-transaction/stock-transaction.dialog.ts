import { Component, Inject } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Stock, StockOrderType } from "@app/stocks/models";

@Component({
	templateUrl: "stock-transaction.dialog.html",
	styleUrls: ["stock-transaction.dialog.scss"]
})
export class StockTransactionDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { stock: Stock, type: StockOrderType }
	) {}
}
