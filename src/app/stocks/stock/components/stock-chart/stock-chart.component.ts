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
	/**
	 * ng2-charts has an issue where it crashes if the number of drawn lines
	 * decreases. This happens when we switch from a 1-day view to a 1-month view.
	 * See: https://github.com/valor-software/ng2-charts/issues/424
	 *
	 * To fix this, if the line count decreases, then "redraw" the graph.
	 */
	private lineCount: number = 0;

	constructor(private ref: ChangeDetectorRef) {}

	chartData = null;
	chartLabels = null;
	legend = {
		display:false
	};
	options = {
		elements: { point: { radius: 0, hitRadius: 10, hoverRadius: 5 } },
		responsive: true,
		maintainAspectRatio: false,
		animation: false,
		scales: {
			yAxes: [{
				ticks: {
					// display: false
				}
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

		/**
		 * ng2-charts has an issue where it crashes if the number of drawn lines
		 * decreases. This happens when we switch from a 1-day view to a 1-month view.
		 * See: https://github.com/valor-software/ng2-charts/issues/424
		 *
		 * To fix this, if the line count decreases, then "redraw" the graph.
		 */
		let lineCount = showPrevClose ? 2 : 1;
		if (lineCount < this.lineCount) {
			this.lineCount = lineCount;
			this.chartData = null;
			this.ref.markForCheck();
			return setTimeout(() => this.updateChartData(chart), 0);
		}
		this.lineCount = lineCount;

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
