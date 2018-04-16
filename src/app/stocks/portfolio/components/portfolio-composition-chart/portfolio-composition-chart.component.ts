import { Component, Input, ChangeDetectorRef, OnChanges } from "@angular/core";
import { PortfolioStock, BatchStockData } from "@app/stocks";

@Component({
	selector: "vs-portfolio-composition-chart",
	templateUrl: "portfolio-composition-chart.component.html",
	styleUrls: ["portfolio-composition-chart.component.scss"]
})
export class PortfolioCompositionChartComponent implements OnChanges {
	@Input() stocks: PortfolioStock[];
	@Input() cash: number;
	@Input() stockPrices: BatchStockData;

	chartData = null;
	chartLabels = null;
	options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false
		}
	};

	constructor(private ref: ChangeDetectorRef) {}

	ngOnChanges() {
		if (this.stocks && this.stockPrices && this.cash) {
			this.chartLabels = [...this.stocks.map(stock => stock.ticker), "Cash"];
			this.chartData = [
				...this.stocks.map(stock => Math.round(this.stockPrices[stock.ticker].price * stock.quantity)),
				Math.round(this.cash)
			];
		}
	}
}
