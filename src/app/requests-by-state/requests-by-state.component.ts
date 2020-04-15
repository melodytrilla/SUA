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
  public doughnutChartLabels: Array<string> = ['Pendientes', 'En curso', 'Resueltas', 'Cerradas'];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = false;
  public doughnutChartData: Array<number> = [0, 0, 0, 0];

  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#616161', '#3bdb98', '#0dc1e0', '#0066cc'],
      hoverBackgroundColor: ['#adadad', '#5cee9e', '#25dae7', '#0787d1'],
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
        textStrokeWidth: 0.1,
        align: 'end',
        font: {size: 25, 
               family: 'open_sanssemibold'},
      }
    },
      legend: {
        fullWidth: false,
        display: false,
        labels: {
          padding: 18,
          fontFamily: 'open_sansregular',
          fontSize: 18,
          usePointStyle: false,
          fontColor: 'hsl (0, 0%, 15%)',
          boxWidth: 10
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
    
    this.solicitudService.getSolicitudesporEstado().subscribe(
      data => {
        let clone1 = JSON.parse(JSON.stringify(this.doughnutChartData));
        let clone2 = JSON.parse(JSON.stringify(this.doughnutChartLabels));
        clone1.forEach((dato,index) =>{ 
          clone1[index] = data[index].number;
          clone2[index] = data[index].name;
          this.total += data[index].number;
        });


        this.doughnutChartData = clone1;
        this.doughnutChartLabels = clone2;
    });

  }
  cambiarFondo(i){
    if (document.getElementById(i).style.backgroundColor == "rgb(0, 102, 204)"){
      document.getElementById(i).style.backgroundColor = "rgb(249, 250, 253)"
      document.getElementById(i).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
      document.getElementById(i).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(i).style.color = "white"
    }
  }

}
