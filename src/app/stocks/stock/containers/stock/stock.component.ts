import { Component, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import * as Chart from "chart.js";


var myLineChart = new Chart(document.getElementById("chart").getContext("2d"), {
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


var myLineChart = new Chart(document.getElementById("chart").getContext("2d"), {
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

@Component({
	templateUrl: "stock.component.html",
	styleUrls: ["stock.component.scss"]
})
export class StockComponent {
	@ViewChild("canvas") canvasEl: ElementRef;

	stock$: Observable<any>;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		// Enter your code here I guess for testing
		console.log(this.canvasEl.nativeElement);

		this.stock$ = this.route.paramMap
			.switchMap((params: ParamMap) => {
				const ticker = params.get("ticker");
				return Observable.of({ ticker });
			});
	}
}
