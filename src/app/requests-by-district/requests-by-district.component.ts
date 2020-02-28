import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SolicitudesService } from '../solicitudes.service';


@Component({
  selector: 'app-requests-by-district',
  templateUrl: './requests-by-district.component.html',
  styleUrls: ['./requests-by-district.component.sass']
})
export class RequestsByDistrictComponent implements OnInit {

  constructor(private solicitudesService: SolicitudesService) {
  }
  
  public doughnutChartLabels: Array<string> = ['Centro', 'Norte', 'Sur', 'Oeste', 'Noroeste', 'Sudoeste'];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartData: Array<number> = [1, 1, 1, 1, 1, 1];
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
        display: true,
        position: 'right',
        
        labels: {
          padding: 12,
          fontSize: 16,
          usePointStyle: true,
          fontColor: '#000000',
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

    this.solicitudesService.getporDistrito().subscribe(
      data =>{
        let clone1 = JSON.parse(JSON.stringify(this.doughnutChartData));
        let clone2 = JSON.parse(JSON.stringify(this.doughnutChartLabels));

        for(let i=0; i < clone1.length; i++){
          clone1[i] = data[i].solicitudes;
          clone2[i] = data[i].distrito;
        }

        this.doughnutChartData = clone1;
        this.doughnutChartLabels = clone2;
      }
    )

  }
}