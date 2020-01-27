import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import * as moment from 'moment';

export interface Opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {
  asc = false;

  constructor(public api: SolicitudesItemsService) { }

  public items: any[];

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

          value.tiempo = moment([this.formato(value.fecha_hora_estado)], "YYYY, MM, DD, h, mm, ss").fromNow();
          value.tiempoInterv =moment([this.formato(value.fecha_hora_intervencion)], "YYYY, MM, DD, h, mm, ss").fromNow();
          value.tiempoMap =moment([this.formato(value.fecha_hora_asignacion)], "YYYY, MM, DD, h, mm, ss").fromNow();
        })
        
        this.items = data
      });
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
  
}

