import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import * as moment from 'moment';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {MapComponent} from '../map/map.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

export interface Opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.sass'],
})
export class MapaComponent implements OnInit {
  asc= false;
  list: {subtipo: string};

  constructor(public api: SolicitudesItemsService,
              private router: Router,
              private rutaActiva: ActivatedRoute,) { }

  public solicitudes: any[];
  public ar: any[] = [];

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;
  @ViewChild(MapComponent, {static: false}) map;

  ngAfterViewInit() {
 
  }

  ngOnInit() {
  
    this.api.getSolicitudes().subscribe(
        data => {
          data.forEach(value => {
              if (value.subtipo.length > 50) {
                value.subtipo = value.subtipo.substr(0, 47) + "...";
              }
              if (value.descripcion.length > 50) {
                value.descripcion = value.descripcion.substr(0, 47) + "...";
              }
              if (value.interseccion.length > 10) {
                value.interseccion = value.interseccion.substr(0, 7) + "...";
              }
              moment.locale('es');
              value.tiempo = moment([this.formato(value.fecha_hora_estado)], "YYYY, MM, DD, h, mm, ss").fromNow();
              value.tiempoInterv =moment([this.formato(value.fecha_hora_intervencion)], "YYYY, MM, DD, h, mm, ss").fromNow();
              value.tiempoMap =moment([this.formato(value.fecha_hora_asignacion)], "YYYY, MM, DD, h, mm, ss").fromNow();
          })
          this.solicitudes = data
        });
        this.list = {
          subtipo: this.rutaActiva.snapshot.params.subtipo,
        };
        this.api.getSolicitudes().subscribe(
          data => {
            data.forEach(value => {
              let x = this.reemplazar(this.list.subtipo)
              if (value.subtipo == x) {
                console.log(value.subtipo, x);
                if (value.subtipo.length > 50) {
                  value.subtipo = value.subtipo.substr(0, 47) + "...";
                }
                if (value.descripcion.length > 50) {
                  value.descripcion = value.descripcion.substr(0, 47) + "...";
                }
                if (value.interseccion.length > 10) {
                  value.interseccion = value.interseccion.substr(0, 7) + "...";
                }
                moment.locale('es');
                value.tiempo = moment([this.formato(value.fecha_hora_estado)], "YYYY, MM, DD, h, mm, ss").fromNow();
                value.tiempoInterv =moment([this.formato(value.fecha_hora_intervencion)], "YYYY, MM, DD, h, mm, ss").fromNow();
                value.tiempoMap =moment([this.formato(value.fecha_hora_asignacion)], "YYYY, MM, DD, h, mm, ss").fromNow();
              this.ar.push(value);
              }
            })
            this.solicitudes = this.ar
            console.log(this.solicitudes)
          });

  }

  sendto(a, b){
    let url= `/detalle/${a}/${b}`;
    this.router.navigateByUrl(url)
  }

  reemplazar(a){
    return a.replace("%20", " ")
  }
  togglePlay(){
    this.asc = !this.asc;
  }
  formato(fecha){
    fecha = fecha.replace("/","-")
    fecha = fecha.replace("/", "-")
    fecha = fecha.replace(" ", "-")
    fecha = fecha.replace(":", "-")
    return fecha.replace(/^(\d{2})-(\d{2})-(\d{4})-(\d{2})-(\d{2})$/g,'$3, $2, $1, $4, $5')
  }
  nextBatch(currIndex: number, items: any[]) {
    const start = this.viewPort.getRenderedRange().start;
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();
console.log(`end is ${end} total is ${total}`)
    if (end == total) {
      console.log("end reached increase page no")
    }
  }

  trackByIdx(i: number) {
    return i;
  }

  panToSolicitud(x:number, y:number){
    //console.log("x: " + x + "///y: " + y );
    this.map.moveMap(x,y);
  }

  showMe(a:number){
    //console.log(a + "estoy en mapa");
    this.viewPort.scrollToIndex(a-1);
  }
}
