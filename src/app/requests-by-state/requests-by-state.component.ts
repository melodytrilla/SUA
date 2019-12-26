import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import 'chart.piecelabel.js';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { filter } from 'minimatch';


@Component({
  selector: 'app-requests-by-state',
  templateUrl: './requests-by-state.component.html',
  styleUrls: ['./requests-by-state.component.sass']
})
export class RequestsByStateComponent implements OnInit {

  constructor() {
  }

  public barChartLabels: Array<string> = ['Pendientes', 'En curso', 'Resueltas', 'Cerradas'];
  public barChartType = 'horizontalBar';
  public barChartLegend = "true";
  public barChartData: Array<number> = [701, 1671, 10773, 477];

  public barChartColors: Array<any> = [
    {
      backgroundColor: ['#9B9487', '#F7B543', '#94D8FA', '#2764F3'],
      hoverBackgroundColor: ['#B2AFAA', '#F6C672', '#BAE3F7', '#6B96FA'],
      borderWidth: 1,
    }
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
    },
    plugins: {
      datalabels: {
        display: true,
        padding: 0,
        color: 'black',
        anchor: 'end',
        textStrokeWidth: 0.2,
        align: 'end',
        formatter: function(value, context) {
          return context.chart.data.labels[context.dataIndex];
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
         gridLines: {
            display: false
         }
      }]
    }   
  }

  public barChartPlugins = [{
    pluginDataLabels,
      /*afterLayout: function (chart){
      chart.legend.legendItems.forEach(
        (label) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += ': ' + value;
          return label;
        }
      )
    } */
  }]

  ngOnInit() {
  }
}
