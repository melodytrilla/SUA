import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import 'chart.piecelabel.js';
import { SolicitudesService } from '../solicitudes.service';
import { BusquedaService } from '../busqueda.service';


@Component({
  selector: 'app-requests-by-state',
  templateUrl: './requests-by-state.component.html',
  styleUrls: ['./requests-by-state.component.sass']
})
export class RequestsByStateComponent implements OnInit, AfterViewInit {

  message: number;
  editMessage: number;
  pen: string;
  enC: string;
  res: string;
  cer: string;

  constructor(private solicitudService: SolicitudesService,
              private service: BusquedaService) {}

  @Input () estados: any[];
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

  ngOnInit(){}

  ngAfterViewInit() {
    this.service.customMessage.subscribe(msg => this.message = msg);
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
    if (this.estados.includes('Pendiente')){
      this.pen = 'fondo-azul'
    }
    else{
      this.pen = 'fondo-blanco'
    }
    if (this.estados.includes('En curso')){
      this.enC = 'fondo-azul'
    }
    else{
      this.enC = 'fondo-blanco'
    }
    if (this.estados.includes('Resuelto')){
      this.res = 'fondo-azul'
    }
    else{
      this.res = 'fondo-blanco'
    }
    if (this.estados.includes('Cerrado')){
      this.cer = 'fondo-azul'
    }
    else{
      this.cer = 'fondo-blanco'
    }
  }
  cambiarFondo(i){
    if (document.getElementById(i).classList.contains('fondo-azul')){
      this.service.borrarEstado(i)
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).classList.replace('fondo-azul', 'fondo-blanco');
    }
    else{
      this.service.agregarEstado(i)
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).classList.replace('fondo-blanco', 'fondo-azul');
    }
    window.sessionStorage['item'] = JSON.stringify(i);
  }

}
