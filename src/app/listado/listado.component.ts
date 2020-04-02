import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as moment from 'moment';
import 'moment/locale/es';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { DownloadService } from '../download.service';

export interface Opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoComponent implements AfterViewInit {
  criterio: string;
  asc:boolean;
  allSelected = false;
  toppings = new FormControl();
  list: {subtipo: string};

  constructor(public api: SolicitudesItemsService,
              private rutaActiva: ActivatedRoute,
              private router: Router,
              public service: DownloadService) { }

  public items: any[];

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;
  
  public scrollListener: number;

  ngAfterViewInit() {
    this.findScrollView();

  }

  loading = false;
  ngOnInit() {
    this.loading = true;
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
            value.tiempo = this.calculateTime(value.fecha_hora_estado);
            value.tiempoInterv = this.calculateTime(value.fecha_hora_intervencion);
            value.tiempoMap = this.calculateTime(value.fecha_hora_asignacion);
            value.checked = false;
        })
        this.items = data;
        this.loading = false;
      });
    this.scrollListener = 0;
  }

  findScrollView(){
    if(this.viewPort == undefined){
      console.log("error");
      setTimeout(()=>{
        this.findScrollView();
      }, 1000);
    }else{
      console.log("linkeado");
      this.viewPort.elementScrolled().subscribe({
        next: (scroll)=> {
          this.scrollListener = scroll["target"]["scrollTop"];
          
        }
      });
    }
  }

  //top botttom action
  topBottomClick(){
    console.log("se activo");
    this.viewPort.scrollToIndex(0);
    //window.scrollTo(0,0);
  }
  
  //TODO: ver. Esto es una forma incorrecta de redirigir ya que se refresca toda la pagina y no el componente.
  sendto(a, b){
    let url= `/detalle/${a}/${b}`;
    this.router.navigateByUrl(url)
  }

  calculateTime(date: Date){
    return moment(date,"DD/MM/YYYY HH:mm:ss").fromNow();
  }

  togglePlay() {
    this.ordenar(this.criterio)
    this.asc = !this.asc;
    }
  
  nextBatch(currIndex: number, items: any[]) {
    const start = this.viewPort.getRenderedRange().start;
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();
  }

  trackByIdx(i: number) {
    return i;
  }

  checkAll() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.items.forEach(element => {
        element.checked = true;
      });
    } 
    else {
      this.items.forEach(element => {
        element.checked = false;
      }); 
    }
  }

  toggleItem(item){
    item.checked = !item.checked;
  }
  exportar(){
  var exportadas: any[] = [];
  this.items.forEach(element => {
    if(element.checked){
      exportadas.push(element)
    }
  })
  if (exportadas.length==0){
    alert("No hay solicitudes seleccionadas")
  }
  return exportadas
}
  downloadFile(){
    return this.service.downloadFile(this.exportar())
    }
  exportAsXLSX():void {
    if (this.exportar().length!=0){
    return this.service.exportAsExcelFile(this.exportar(), 'solicitudes');
    }
  }
  ordenar(c: string){
    console.log('anda')
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
            value.tiempo = this.calculateTime(value.fecha_hora_estado);
            value.tiempoInterv = this.calculateTime(value.fecha_hora_intervencion);
            value.tiempoMap = this.calculateTime(value.fecha_hora_asignacion);
            value.checked = false;
            if( c == 'asig'){
            value.asig = value.asignaciones.length
            }
            else if( c == 'solic'){
              value.solic = value.solicitantes.length
              }
            else if( c == 'inter'){
                value.inter = value.intervenciones.length
                }
            else if( c == 'fechaR'){
                value.fechaR = this.formato(value.fecha_hora_registro)
                }
            else if( c == 'fechaE'){
                value.fechaE = this.formato(value.fecha_hora_estado)
                }
            this.criterio = c;
        })
        this.items = data;
        this.loading = false;
      });
  }
formato(fecha){
  fecha = fecha.replace("/", ",");
  fecha = fecha.replace("/", ",");
  return fecha.replace(/(\d{2}),(\d{2}),(\d{4}) (\d{2}):(\d{2})/, "$3$2$1$4$5")
}
}
