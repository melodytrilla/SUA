import { Component, OnInit } from '@angular/core';
import { ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import 'chart.piecelabel.js';
import { SolicitudesService } from '../solicitudes.service';


@Component({
  selector: 'app-requests-by-state',
  templateUrl: './requests-by-state.component.html',
  styleUrls: ['./requests-by-state.component.sass']
})
export class RequestsByStateComponent implements OnInit {

  constructor(private solicitudService: SolicitudesService) {
  }

  total = 0;
  public hBarChartLabels: Array<string> = ['Pendientes', 'En curso', 'Resueltas', 'Cerradas'];
  public hBarChartType = 'horizontalBar';
  public hBarChartLegend = false;
  public hBarChartData: Array<number> = [0, 0, 0, 0];

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
        textStrokeWidth: 0.1,
        align: 'end',
        font: {size: 25, 
               family: 'open_sanssemibold'},
      }
    },
      legend: {
        fullWidth: false,
        display: false,
        position: 'right',
        
        labels: {
          padding: 18,
          fontFamily: 'open_sansregular',
          fontSize: 18,
          usePointStyle: true,
          fontColor: '#000000',
          boxWidth: 10
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
    
    this.solicitudService.getSolicitudesporEstado().subscribe(
      data => {
        let clone1 = JSON.parse(JSON.stringify(this.hBarChartData));
        let clone2 = JSON.parse(JSON.stringify(this.hBarChartLabels));
        clone1.forEach((dato,index) =>{ 
          clone1[index] = data[index].number;
          clone2[index] = data[index].name;
          this.total += data[index].number;
        });


        this.hBarChartData = clone1;
        this.hBarChartLabels = clone2;
    });

  }
}
