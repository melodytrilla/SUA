import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import 'chart.piecelabel.js';
import { preserveWhitespacesDefault, sanitizeIdentifier } from '@angular/compiler';
import { filter } from 'minimatch';


@Component({
  selector: 'app-requests-by-state',
  templateUrl: './requests-by-state.component.html',
  styleUrls: ['./requests-by-state.component.sass']
})
export class RequestsByStateComponent implements OnInit {

  constructor() {
  }
  total = 701 + 1671 + 10773 + 477;
  public hBarChartLabels: Array<string> = ['Pendientes', 'En curso', 'Resueltas', 'Cerradas'];
  public hBarChartType = 'horizontalBar';
  public hBarChartLegend = false;
  public hBarChartData: Array<number> = [701, 1671, 10773, 477];

  public hBarChartColors: Array<any> = [
    {
      backgroundColor: ['#9B9487', '#F7B543', '#94D8FA', '#2764F3'],
      hoverBackgroundColor: ['#B2AFAA', '#F6C672', '#BAE3F7', '#6B96FA'],
      borderWidth: 1,
    }
  ];
  public hBarChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
    
      
    },

    scales:{
      xAxes:[{
        display: false
        
      }],
      yAxes:[{
        gridLines:{
          display: false
        }
      }]
    },
    
    layout:{
      padding:{
        right:70
      }
    },


    plugins: {
      datalabels: {
        display: true,
        padding: 0,
        color: 'black',
        anchor: 'end',
        textStrokeWidth: 0.4,
        align: 'end',
        font: {size: 25},
      }
    },
      legend: {
        fullWidth: false,
        display: false,
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
  public hBarChartPlugins = [{
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
