import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import * as moment from 'moment';

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
  
  constructor(public api: SolicitudesItemsService) { }

  public solicitudes: any[];


  ngOnInit() {
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
          if (value.subtipo.length > 35) {
            value.subtipo = value.subtipo.substr(0, 32) + "...";
          }
          if (value.interseccion.length > 10) {
            value.interseccion = value.interseccion.substr(0, 7) + "...";
          }
          value.tiempo = moment([this.formato(value.fecha_hora_estado)], "YYYY, MM, DD, h, mm, ss").fromNow();
        })
        
        
        this.solicitudes = data
      });
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
}
