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

  public doughnutChartLabels: Array<string> = ['Pendientes', 'En curso', 'Resueltas', 'Cerradas'];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [701, 1671, 10773, 477];

  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#9B9487', '#F7B543', '#94D8FA', '#2764F3'],
      hoverBackgroundColor: ['#B2AFAA', '#F6C672', '#BAE3F7', '#6B96FA'],
      borderWidth: 1,
    }
  ];
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
    
      
    },
    plugins: {
      datalabels: {
        display: false,
        padding: 0,
        color: 'black',
        anchor: 'end',
        textStrokeWidth: 0.2,
        align: 'end'
      }
    },
      legend: {
        fullWidth: false,
        display: true,
        position: 'right',
        
        labels: {
          padding: 18,
          fontSize: 18,
          usePointStyle: true,
          fontColor: '#82817F',
          boxWidth: 10,
        }
      }
  }
  public doughnutChartPlugins = [{
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
