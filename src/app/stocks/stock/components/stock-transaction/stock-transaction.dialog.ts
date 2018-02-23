import { Component, Inject } from "@angular/core";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TransactionType, StockDetail } from "@app/stocks/models";

@Component({
	templateUrl: "stock-transaction.dialog.html",
	styleUrls: ["stock-transaction.dialog.scss"]
})
export class StockTransactionDialog {
	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { stock: StockDetail, type: TransactionType },
		private dialogRef: MatDialogRef<StockTransactionDialog>
	) {}

	get title(): string {
		let action;
		if (this.data.type === TransactionType.BUY) action = "Buy";
		else if (this.data.type === TransactionType.SELL) action = "Sell";
		else if (this.data.type === TransactionType.LIMIT) action = "Limit";
		else if (this.data.type === TransactionType.SHORT) action = "Short";

		return `${action} ${this.data.stock.ticker}`;
	}

	get stock() {
		return this.data.stock;
	}

	confirm() {
		this.dialogRef.close({
			action: TransactionType.BUY,
			ticker: this.stock.ticker,
			quantity: 10
		});
	}
}
