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
}
