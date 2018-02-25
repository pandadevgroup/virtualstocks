import { Component, Input } from "@angular/core";

import { StockChart } from "@app/stocks/models";

@Component({
	selector: "vs-stock-chart",
	template: `
		<canvas baseChart
			[datasets]="chartData"
			[labels]="chartLabels"
            [options]="{ responsive: true }"
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

	chartData = null;
	chartLabels = null;
	legend = {
		display:false
	}
	private updateChartData(data: StockChart) {
		let chartData = [];
		let chartLabels = [];

		data.forEach(dataPoint => {
			chartData.push(dataPoint.value);
			chartLabels.push(dataPoint.label);
		});

		this.chartData = [
			{
				data: chartData,
				label: "Close"
			}
		];
		this.chartLabels = chartLabels;
		
	}
}
