import { Component, Inject } from "@angular/core";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StockOrderType, StockDetail } from "@app/stocks/models";

@Component({
	templateUrl: "stock-transaction.dialog.html",
	styleUrls: ["stock-transaction.dialog.scss"]
})
export class StockTransactionDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { stock: StockDetail, type: StockOrderType },
		private dialogRef: MatDialogRef<StockTransactionDialog>
	) {}

	get title(): string {
		let action;
		if (this.data.type === StockOrderType.BUY) action = "Buy";
		else if (this.data.type === StockOrderType.SELL) action = "Sell";
		else if (this.data.type === StockOrderType.LIMIT) action = "Limit";
		else if (this.data.type === StockOrderType.SHORT) action = "Short";

		return `${action} ${this.data.stock.ticker}`;
	}

	get stock() {
		return this.data.stock;
	}

	confirm() {
		this.dialogRef.close({
			action: StockOrderType.BUY,
			ticker: this.stock.ticker,
			quantity: 10
		});
	}
}
