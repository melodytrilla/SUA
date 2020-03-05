import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as moment from 'moment';
import 'moment/locale/es';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';

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
  asc = false;
  toppings = new FormControl();
  list: {subtipo: string};

  constructor(public api: SolicitudesItemsService,
              private rutaActiva: ActivatedRoute,
              private router: Router) { }

  public items: any[];
  public ar: any[] = [];

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;
  
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
          this.items = data
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
            this.items = this.ar
            console.log(this.items)
          });
  }
  
  sendto(a, b){
    let url= `/detalle/${a}/${b}`;
    this.router.navigateByUrl(url)
  }
  togglePlay() {
    this.asc = !this.asc;
  }
  formato(fecha){
    fecha = fecha.replace("/","-")
    fecha = fecha.replace("/", "-")
    fecha = fecha.replace(" ", "-")
    fecha = fecha.replace(":", "-")
    return fecha.replace(/^(\d{2})-(\d{2})-(\d{4})-(\d{2})-(\d{2})$/g,'$3, $2, $1, $4, $5')
  }
  reemplazar(a){
    return a.replace("%20", " ")
  }
  
  nextBatch(currIndex: number, items: any[]) {
    const start = this.viewPort.getRenderedRange().start;
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();
  }

  trackByIdx(i: number) {
    return i;
  }
}


