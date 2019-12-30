import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-requests-by-origin',
  templateUrl: './requests-by-origin.component.html',
  styleUrls: ['./requests-by-origin.component.sass']
})
export class RequestsByOriginComponent implements OnInit {

  constructor() { }
  
  public doughnutChartLabels: Array<string> = ['Telefónico', 'Contacto Web', 'Twitter', 'Personal', 'Facebook', 'Nota/Expediente', 'VVV', 'MR', 'Externo'] ;
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [9542, 3017, 548, 80, 125, 10, 10, 200, 90];
  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#F5CBA7', '#48C9B0', '#2471A3', '#F7DC6F', '#AF7AC5', '#F1948A', '#EE493E', '#88B6DF'],
      hoverBackgroundColor: ['#FAE5D3', '#76D7C4', '#5499C7', '#F9E79F', '#D7BDE2', '#FADBD8', '#F96D63', '#A2D0F9'],
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
        color: '#82817F',
        anchor: 'end',
        textStrokeWidth: 0.2,
        align: 'end',
        formatter: function(value) {
          return value;
      }
     }
    },
      legend: {
        fullWidth: false,
        position: 'right',
        display: true,
        labels: {
          padding: 10,
          fontSize: 16,
          usePointStyle: true,
          fontColor: '#929191',
          boxWidth: 9,
      }
  }
}
  public doughnutChartPlugins = [{
      ChartDataLabels,
      /*afterLayout: function (chart){
        chart.legend.legendItems.forEach(
          (label) => {
            let value = chart.data.datasets[0].data[label.index];
            if (value > 500) {
              return label.text
            }
            else {
              chart.data.datasets[0].data[label.index] = 0
              label.text = ""
              return null 
          
            }
          }
        )
      }*/
      /*afterLayout: function (chart){
      chart.legend.legendItems.forEach(
        (label) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += "\n" + value  ;
          return label;
        }
      )
    }*/
    }];

  ngOnInit() {
  }

}
