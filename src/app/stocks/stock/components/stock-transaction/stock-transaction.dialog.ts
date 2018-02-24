
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


/*
import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
@Component({
  selector: 'demo-modal-service-confirm-window',
  templateUrl: './service-confirm-window.html'
})
export class DemoModalServiceConfirmWindowComponent {
  modalRef: BsModalRef;
  message: string;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
*/