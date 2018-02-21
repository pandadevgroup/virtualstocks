import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { MatButtonModule } from '@angular/material';

import * as Chart from "chart.js";

import { StockDetail } from "@app/stocks/models";


@Component({
	selector: "vs-stock-detail",
	templateUrl: "stock-detail.component.html",
	styleUrls: ["stock-detail.component.scss"]
})
export class StockDetailComponent {
	@ViewChild("canvas") canvasEl: ElementRef;

	@Input() stock: StockDetail;
	@Output() buyStock: EventEmitter<any> = new EventEmitter();

	ngOnInit() {
		// Enter your code here I guess for testing

		var detailChart = new Chart(this.canvasEl.nativeElement.getContext("2d"), {
			type: 'line',
			data: {
			  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				datasets: [{
					label:"set 1",
					borderColor: 'rgb(0, 122, 255)',
					backgroundColor:'rgba(0, 122, 255, 0.5)',
					data: [159, 163, 161, 155, 158, 157, 160],
					borderWidth:2.5
				}]
			},
			options: {
			  legend: {
				display: false
			},
			tooltips: {
				callbacks: {
				   label: function(tooltipItem) {
						  return tooltipItem.yLabel;
				   }
				}
			},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:false
						}
					}]
				}
			}
		});
	}

	onBuyStockClick() {
		this.buyStock.emit();
	}
}
