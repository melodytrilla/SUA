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

  loading = false;

  ngOnInit() {
  
    this.loading = true;
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

              value.tiempo = this.calculateTime(value.fecha_hora_estado);
              value.tiempoInterv = this.calculateTime(value.fecha_hora_intervencion);
              value.tiempoMap = this.calculateTime(value.fecha_hora_asignacion);
          })
          this.solicitudes = data;
          this.loading = false;
      });
  }

  calculateTime(date: Date){
    return moment(date,"DD/MM/YYYY HH:mm:ss").fromNow();
  }

  sendto(a, b){
    let url= `/detalle/${a}/${b}`;
    this.router.navigateByUrl(url)
  }

  togglePlay(){
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

  panToSolicitud(x:number, y:number){
    this.map.moveMap(x,y);
  }

  showMe(a:number){
    this.viewPort.scrollToIndex(a-1);
  }
}
