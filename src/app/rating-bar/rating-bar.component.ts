import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import 'chart.piecelabel.js';

@Component({
  selector: 'rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.sass'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-100%)'}),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({transform: 'translateY(-100%)'}))
        ])
    ])
]
})
export class RatingBarComponent implements OnInit {

  ratings = [40, 50, 10]; //pedirlo en porcentajes
  total = 3471;

  ngOnInit() {
  }

  
  
  


  public barChartLabels: Array<string> = ['Neutral', 'Negativas', 'Positivas'];
  public barChartType = 'bar';
  public barChartLegend = "false";
  public barChartData: Array<number> = this.ratings;

  public barChartColors: Array<any> = [
    {
      backgroundColor: ['#ffcd56', '#ff6384', '#76deb1'],
      hoverBackgroundColor: ['#ffd04f', '#ff4a68', '#58d1a9'],
      borderWidth: 1,
    }
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
          top: 30
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        padding: 0,
        anchor: 'end',
        font: {
          size: 20
        },
        textStrokeWidth: 0.3,
        align: 'end',
        formatter: function (value, context) {
          return Math.round(value) + "%";
        }
      }
    },
    //Hide background guide lines
    scales: {
      xAxes: [{
         gridLines: {
            display: false
         }
      }],
      yAxes: [{
        display:false,
        ticks:{
          beginAtZero: true
        },
         gridLines: {
            display: false
         }
      }]
    }   
  }
}

