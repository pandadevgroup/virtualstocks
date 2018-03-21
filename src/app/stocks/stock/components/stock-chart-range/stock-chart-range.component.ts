import { Component, Input, Output, EventEmitter } from "@angular/core";
import { StockQueryRange } from "@app/stocks";

@Component({
	selector: "vs-stock-chart-range",
	templateUrl: "stock-chart-range.component.html",
	styleUrls: ["stock-chart-range.component.scss"]
})
export class StockChartRangeComponent {
	@Input() chartRange: StockQueryRange;
	@Output() chartRangeChange: EventEmitter<StockQueryRange> = new EventEmitter();

	updateChartRange(range: StockQueryRange) {
		this.chartRangeChange.emit(range);
	}
}
