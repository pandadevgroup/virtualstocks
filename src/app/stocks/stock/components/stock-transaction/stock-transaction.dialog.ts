import { Component, Inject } from "@angular/core";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StockTransactionType, StockDetail } from "@app/stocks/models";

@Component({
	templateUrl: "stock-transaction.dialog.html",
	styleUrls: ["stock-transaction.dialog.scss"]
})
export class StockTransactionDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { stock: StockDetail, type: StockTransactionType },
		private dialogRef: MatDialogRef<StockTransactionDialog>
	) {}

	get title(): string {
		let action;
		if (this.data.type === StockTransactionType.BUY) action = "Buy";
		else if (this.data.type === StockTransactionType.SELL) action = "Sell";
		else if (this.data.type === StockTransactionType.LIMIT) action = "Limit";
		else if (this.data.type === StockTransactionType.SHORT) action = "Short";

		return `${action} ${this.data.stock.ticker}`;
	}

	get stock() {
		return this.data.stock;
	}

	confirm() {
		this.dialogRef.close({
			action: StockTransactionType.BUY,
			ticker: this.stock.ticker,
			quantity: 10
		});
	}
}
