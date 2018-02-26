import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { StockDetail, StockTransactionType, StockChart } from "@app/stocks/models";
import { User } from "@app/auth";

@Component({
	selector: "vs-stock-detail",
	templateUrl: "stock-detail.component.html",
	styleUrls: ["stock-detail.component.scss"]
})
export class StockDetailComponent {
	@Input() stock: StockDetail;
	@Input() chart: StockChart;
	@Input() user: User;
	@Output() transaction: EventEmitter<{ stock, uid, type, quantity }> = new EventEmitter();

	transactionForm = this.fb.group({
		quantity: 1
	});
	shareQuantityMsgMapping: { [k: string]: string } = { "=1": "share", "other": "shares" };

	get quantity() {
		return this.transactionForm.get("quantity").value || 0;
	}

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
	}

	onTransaction(type: StockTransactionType) {
		const stock = this.stock;
		const uid = this.user.id;
		const quantity = this.quantity;
		this.transaction.emit({ stock, uid, type, quantity });
	}
}
