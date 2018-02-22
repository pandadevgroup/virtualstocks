import { Component, Output, EventEmitter } from "@angular/core";
import { StockOrderType } from "@app/stocks/models";

@Component({
	selector: "vs-stock-actions",
	templateUrl: "stock-actions.component.html",
	styleUrls: ["stock-actions.component.scss"]
})
export class StockActionsComponent {
	@Output() userAction: EventEmitter<StockOrderType> = new EventEmitter();

	onBuy() {
		this.userAction.emit(StockOrderType.BUY);
	}

	onSell() {
		this.userAction.emit(StockOrderType.SELL);
	}
}
