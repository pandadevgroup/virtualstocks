import { Component, Output, EventEmitter, Input } from "@angular/core";
import { StockTransactionType, StockQuote } from "@app/stocks/models";
import { FormBuilder } from "@angular/forms";
import { User } from "@app/auth/models";

@Component({
	selector: "vs-stock-actions",
	templateUrl: "stock-actions.component.html",
	styleUrls: ["stock-actions.component.scss"]
})
export class StockActionsComponent {
	@Input() stockQuote: StockQuote;
	@Input() user: User;
	@Output() transaction: EventEmitter<{ stock, uid, type, quantity }> = new EventEmitter();

	onTransaction(transactionInfo: { stock, quantity }, type: StockTransactionType) {
		const uid = this.user.id;
		this.transaction.emit({
			...transactionInfo,
			type,
			uid
		});
	}
}
