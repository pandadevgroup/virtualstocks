import { Component, Output, EventEmitter, Input } from "@angular/core";
import { StockTransactionType, StockDetail } from "@app/stocks/models";
import { FormBuilder } from "@angular/forms";
import { User } from "@app/auth/models";

@Component({
	selector: "vs-stock-actions",
	templateUrl: "stock-actions.component.html",
	styleUrls: ["stock-actions.component.scss"]
})
export class StockActionsComponent {
	@Input() stock: StockDetail;
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

	onTransaction(type: StockTransactionType) {
		const stock = this.stock;
		const uid = this.user.id;
		const quantity = this.quantity;
		this.transaction.emit({ stock, uid, type, quantity });
	}
}
