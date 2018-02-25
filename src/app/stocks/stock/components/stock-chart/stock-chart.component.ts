import { Component } from "@angular/core";

@Component({
	selector: "vs-stock-chart",
	template: `
		<canvas baseChart
			[datasets]="chartData"
			[labels]="chartLabels"
            [options]="{ responsive: true }"
			chartType="line">
		</canvas>
	`,
	styleUrls: ["stock-chart.component.scss"]
})
export class StockChartComponent {
	chartData = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
	];
	chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
}
