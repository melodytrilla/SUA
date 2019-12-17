import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-top10-categories',
  templateUrl: './top10-categories.component.html',
  styleUrls: ['./top10-categories.component.sass']
})
export class Top10CategoriesComponent implements OnInit {

  constructor() { }

  public doughnutChartLabels: Array<string> = ['Alumbrado', 'Colectivos Urbanos', 'Estacionamiento Medido', 'Bicis Públicas', 'Higiene Urbana', 'Semáforos', 'Señalización Vial', 'Taxis y Remises', 'Arbolado', 'Tránsito'] ;
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [1056, 3522, 348, 350, 367, 325, 347, 300, 390, 335];
  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#48C9B0', '#88B6DF', '#2471A3', '#F5CBA7', '#AF7AC5', '#F1948A', '#EE493E', '#F7DC6F', '#97C442'],
      hoverBackgroundColor: ['#76D7C4', '#A2D0F9', '#5499C7', '#FAE5D3', '#D7BDE2', '#FADBD8', '#F96D63', '#F9E79F', '#B8DF6D'],
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
          padding: 9,
          fontSize: 13,
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
