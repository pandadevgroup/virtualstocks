import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "@app/auth";

@Component({
	selector: "vs-stock-actions",
	templateUrl: "stock-actions.component.html",
	styleUrls: ["stock-actions.component.scss"]
})
export class StockActionsComponent {
	@Input() user: User;
	@Output() buyStock: EventEmitter<{ ticker: string, uid: string }> = new EventEmitter();
}
