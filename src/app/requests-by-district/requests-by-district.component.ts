import { Component, OnInit} from '@angular/core';
import { ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SolicitudesService } from '../solicitudes.service';
import { BusquedaService } from '../busqueda.service';

@Component({
  selector: 'app-requests-by-district',
  templateUrl: './requests-by-district.component.html',
  styleUrls: ['./requests-by-district.component.sass']
})
export class RequestsByDistrictComponent implements OnInit {

  constructor(private solicitudesService: SolicitudesService,
              private busqueda: BusquedaService) {
  }
  public arr: any[] = [];
  public doughnutChartLabels: Array<string> = ['Centro', 'Norte', 'Sur', 'Oeste', 'Noroeste', 'Sudoeste'];
  public doughnutChartType = 'bar';
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
    maintainAspectRatio: false,
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
        display: false,
        position: 'right',
        onClick: function(e, legendItem) {
          var cont: number =0;
          var a: any[]
          var index = legendItem.index;
          var ci = this.chart;
          ci.data.datasets.forEach(function(e, i) {
            for (let item of e._meta[8].data){
              if (e._meta[8].data[item._index].hidden == false){
                cont++;
              }
            }
            for (let item of e._meta[8].data){
              if(cont == e._meta[8].data.length){
                e._meta[8].data[item._index].hidden = true
                e._meta[8].data[index].hidden = false
                a = []
                BusquedaService.prototype.inicDist(e._meta[8].data[index]._view.label)
                //console.log(a)
              }
              else if(item._index == index){
                e._meta[8].data[index].hidden = !e._meta[8].data[index].hidden
                if (e._meta[8].data[index].hidden == true){
                  BusquedaService.prototype.borrarDist(e._meta[8].data[index]._view.label)
                  //console.log(a)
                }
                else {
                  BusquedaService.prototype.agregarDist(e._meta[8].data[index]._view.label)
                  //console.log(a)
                }
              }
            }
          });
          RequestsByDistrictComponent.prototype.arr = a;
          ci.update();
        },
        onHover: function(event, legendItem) {
            document.getElementById("doughnut").style.cursor = 'pointer';
          },
        labels: {
          padding: 12,
          fontSize: 16,
          fontFamily: 'open_sansregular',
          fontColor: 'black',
          usePointStyle: true,
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
    this.arr = this.solicitudesService.filteredVecinalesSearch("Centro")
    console.log(this.arr)
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