import { Component, Input, ChangeDetectorRef } from "@angular/core";

import { StockChart } from "@app/stocks/models";

@Component({
	selector: "vs-stock-chart",
	template: `
		<canvas baseChart
			[datasets]="chartData"
			[labels]="chartLabels"
            [options]="options"
			chartType="line"
			*ngIf="chartData">
		</canvas>
	`,
	styleUrls: ["stock-chart.component.scss"]
})
export class StockChartComponent {
	@Input() set chart(data: StockChart) {
		if (data) this.updateChartData(data);
	}

	constructor(private ref: ChangeDetectorRef) {}

	chartData = null;
	chartLabels = null;
	legend = {
		display:false
	};
	options = {
		elements: { point: { radius: 0, hitRadius: 10, hoverRadius: 5 } },
		responsive: true
	};

	private updateChartData(data: StockChart) {
		let chartData = [];
		let chartLabels = [];

		data.forEach(dataPoint => {
			chartData.push(dataPoint.value);
			chartLabels.push(dataPoint.label);
		});

		this.chartData = null;

		setTimeout(() => {
			this.chartData = [
				{
					data: chartData,
					label: "Close"
				}
			];
			this.chartLabels = chartLabels;

			this.ref.markForCheck();
		}, 0);
	}
}
