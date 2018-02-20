import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { Store } from "@ngrx/store";

import { StockDetail } from "@app/stocks/models";
import * as fromStore from "@app/stocks/store";

import * as Chart from "chart.js";

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent implements OnInit, OnDestroy {
	@ViewChild("canvas") canvasEl: ElementRef;

	stock$: Observable<StockDetail>;

	constructor(private store: Store<fromStore.StocksState>) {}

	ngOnInit() {
		this.store.dispatch(new fromStore.QueryCurrentStockDetail());
		this.stock$ = this.store.select(fromStore.getStockDetail);


		// Enter your code here I guess for testing

		var myLineChart = new Chart(this.canvasEl.nativeElement.getContext("2d"), {
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

	ngOnDestroy() {
		this.store.dispatch(new fromStore.ClearStockDetail());
	}
}
