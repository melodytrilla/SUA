import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-requests-by-origin',
  templateUrl: './requests-by-origin.component.html',
  styleUrls: ['./requests-by-origin.component.sass']
})
export class RequestsByOriginComponent implements OnInit {

  constructor() { }
  
  public doughnutChartLabels: Array<string> = ['Telefónico', 'Personal', 'Facebook', 'Twitter', 'Contacto Web', 'Nota/Expediente', 'VVV', 'MR', 'Externo'] ;
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [9542, 80, 125, 548, 3017, 10, 10, 200, 100];
  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#F5CBA7', '#48C9B0', '#2471A3', '#F7DC6F', '#AF7AC5', '#F1948A'],
      hoverBackgroundColor: ['#FAE5D3', '#76D7C4', '#5499C7', '#F9E79F', '#D7BDE2', '#FADBD8'],
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
        display: true,
        position: 'right',
        
        labels: {
          padding: 5,
          fontSize: 8,
          usePointStyle: true,
          fontColor: '#82817F',
          boxWidth: 8,
          filter: function(item, chart) {
            return !item.text.includes('')
        }
        }
      }
  }
  public doughnutChartPlugins = [{
      ChartDataLabels,
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
