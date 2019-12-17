import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-requests-by-district',
  templateUrl: './requests-by-district.component.html',
  styleUrls: ['./requests-by-district.component.sass']
})
export class RequestsByDistrictComponent implements OnInit {

  constructor() {
  }
  
  public doughnutChartLabels: Array<string> = ['Centro', 'Norte', 'Sur', 'Oeste', 'Noroeste', 'Sudoeste'];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [7566, 1671, 986, 896, 1200, 1303];
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
          padding: 10,
          fontSize: 18,
          usePointStyle: true,
          fontColor: '#929191',
          boxWidth: 11,
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