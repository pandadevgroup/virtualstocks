import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";

import * as Chart from "chart.js";

import { StockDetail, TransactionType } from "@app/stocks/models";
import { User } from "@app/auth";

@Component({
	selector: "vs-stock-detail",
	templateUrl: "stock-detail.component.html",
	styleUrls: ["stock-detail.component.scss"]
})
export class StockDetailComponent {
	@ViewChild("canvas") canvasEl: ElementRef;

	@Input() stock: StockDetail;
	@Input() user: User;
	@Output() transaction: EventEmitter<{ stock, uid, type }> = new EventEmitter();

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

	onUserAction(type: TransactionType) {
		const stock = this.stock;
		const uid = this.user.id;
		this.transaction.emit({ stock, uid, type });
	}
}
