import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { StockQuote, StockTransactionType, StockChart, StockCompanyInfo, StockDividendInfo, StockEarningsInfo, StockFinancialsInfo, StockNews, StockSplit, StockQueryRange } from "@app/stocks/models";
import { User } from "@app/auth";

@Component({
	selector: "vs-stock-detail",
	templateUrl: "stock-detail.component.html",
	styleUrls: ["stock-detail.component.scss"]
})
export class StockDetailComponent implements OnChanges {
	@Input() stockQuote: StockQuote;
	@Input() chart: StockChart;
	@Input() company: StockCompanyInfo;
	@Input() dividends: StockDividendInfo[];
	@Input() earnings: StockEarningsInfo[];
	@Input() financials: StockFinancialsInfo[];
	@Input() news: StockNews[];
	@Input() splits: StockSplit[];
	@Input() user: User;
	@Input() chartRange: StockQueryRange;
	@Output() chartRangeChange: EventEmitter<StockQueryRange> = new EventEmitter();

	ngOnChanges(changes: SimpleChanges) {
		const chartRange = changes.chartRange && changes.chartRange.currentValue || this.chartRange;
		const stockQuote = changes.stockQuote && changes.stockQuote.currentValue || this.stockQuote;

		if (chartRange === "1d" && stockQuote) {
			this.chart.close = stockQuote.previousClose;
		} else {
			this.chart.close = null;
		}

		if (changes.stockQuote || changes.chart) this.chart.ticker = stockQuote.ticker;
	}

	updateChartRange(range: StockQueryRange) {
		this.chartRangeChange.emit(range);
	}
}
