import { Component, Input, ChangeDetectorRef } from "@angular/core";

import { StockChart } from "@app/stocks/models";

@Component({
	selector: "vs-stock-chart",
	templateUrl: "stock-chart.component.html",
	styleUrls: ["stock-chart.component.scss"]
})
export class StockChartComponent {
	@Input() ticker: string;
	@Input() prevClose: number;
	@Input() showPrevClose: boolean;
	@Input() set chart(data: StockChart) {
		this.updateChartData(data);
	}

	constructor(private ref: ChangeDetectorRef) {}

	chartData = null;
	chartLabels = null;
	legend = {
		display:false
	};
	options = {
		elements: { point: { radius: 0, hitRadius: 10, hoverRadius: 5 } },
		responsive: true,
		scales: {
			xAxes: [{
				type: "time"
			}]
		}
	};

	private updateChartData(chart: StockChart | null) {
		if (chart == null) return this.chartData = null;
		let chartData = [];
		let chartLabels = [];
		let chartCloseData = null;
		let showPrevClose = this.showPrevClose && this.prevClose;

		if (showPrevClose) {
			chartCloseData = [];
		}

		chart.data.forEach(dataPoint => {
			chartData.push(dataPoint.value);
			chartLabels.push(dataPoint.label);

			if (showPrevClose) {
				chartCloseData.push(this.prevClose);
			}
		});

		this.chartData = [
			{
				data: chartData,
				label: this.ticker
			}
		];

		if (chartCloseData) {
			this.chartData.push({
				data: chartCloseData,
				label: "Previous Close",
				fill: "false"
			});
		}

		this.chartLabels = chartLabels;

		this.ref.markForCheck();
	}
}
