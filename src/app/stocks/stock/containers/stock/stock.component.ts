import { Component } from "@angular/core";


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


export class StockComponent {}
