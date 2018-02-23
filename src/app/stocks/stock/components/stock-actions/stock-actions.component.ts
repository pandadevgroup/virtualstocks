import { Component, Output, EventEmitter } from "@angular/core";
import { StockTransactionType } from "@app/stocks/models";

@Component({
	selector: "vs-stock-actions",
	templateUrl: "stock-actions.component.html",
	styleUrls: ["stock-actions.component.scss"]
})
export class StockActionsComponent {
	@Output() userAction: EventEmitter<StockTransactionType> = new EventEmitter();

	onBuy() {
		this.userAction.emit(StockTransactionType.BUY);
	}

	onSell() {
		this.userAction.emit(StockTransactionType.SELL);
	}
}
