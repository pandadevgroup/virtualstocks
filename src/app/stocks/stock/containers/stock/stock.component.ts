import { Component } from "@angular/core";

import * as Chart from "chart.js";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent {
	ngOnInit() {
		// Enter your code here I guess for testing
		var myLineChart = new Chart(document.getElementById("chart").msGetInputContext("2d"), {
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
		console.log(Chart);
	}
}
