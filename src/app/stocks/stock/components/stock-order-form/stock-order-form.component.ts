import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { StockQuote, StockTransactionType } from "@app/stocks/models";

@Component({
	selector: "vs-stock-order-form",
	templateUrl: "stock-order-form.component.html",
	styleUrls: ["stock-order-form.component.scss"]
})
export class StockOrderFormComponent {
	@Input() stockQuote: StockQuote;
	@Input() type: "buy" | "sell";
	@Output() transaction: EventEmitter<{ stock, quantity }> = new EventEmitter();

	transactionForm = this.fb.group({
		quantity: 1
	});
	shareQuantityMsgMapping: { [k: string]: string } = { "=1": "share", "other": "shares" };

	get quantity() {
		return this.transactionForm.get("quantity").value || 0;
	}

	constructor(private fb: FormBuilder) {}

	onTransaction() {
		const stock = this.stockQuote;
		const quantity = this.quantity;
		this.transaction.emit({ stock, quantity });
	}
}
