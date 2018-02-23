import { Component, Output, EventEmitter } from "@angular/core";
import { TransactionType } from "@app/stocks/models";

@Component({
	selector: "vs-stock-actions",
	templateUrl: "stock-actions.component.html",
	styleUrls: ["stock-actions.component.scss"]
})
export class StockActionsComponent {
	@Output() userAction: EventEmitter<TransactionType> = new EventEmitter();

	onBuy() {
		this.userAction.emit(TransactionType.BUY);
	}

	onSell() {
		this.userAction.emit(TransactionType.SELL);
	}
}
