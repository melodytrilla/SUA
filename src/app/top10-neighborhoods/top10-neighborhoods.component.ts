import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-top10-neighborhoods',
  templateUrl: './top10-neighborhoods.component.html',
  styleUrls: ['./top10-neighborhoods.component.sass']
})
export class Top10NeighborhoodsComponent implements OnInit {

  constructor(private solicitudesService: SolicitudesService) { }

  public doughnutChartLabels: Array<string> = ['Acera 1', 'Acindar 2', 'Alberdi 3', 'Avellaneda 9', 'Azcuénaga 12', 'Dorrego 31', 'La Florida 57', 'Unión 94', 'Pellegrini 28', 'Del Bicentenario 51'] ;
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
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
        color: '#000000',
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
          fontSize: 14,
          fontFamily: 'open_sansregular',
          fontColor: 'black',
          usePointStyle: true,
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
    
    this.solicitudesService.get10Vecinales().subscribe(
      data =>{
        let clone1 = JSON.parse(JSON.stringify(this.doughnutChartData));
        let clone2 = JSON.parse(JSON.stringify(this.doughnutChartLabels));

        for(let i=0; i < clone1.length; i++){
          clone1[i] = data[i].num;
          clone2[i] = data[i].nombre;
        }

        this.doughnutChartData = clone1;
        this.doughnutChartLabels = clone2;
      }
    )
  }

}
