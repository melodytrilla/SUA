import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import { ActivatedRoute } from '@angular/router';
import { SolicitudesItemsService } from '../solicitudes-items.service';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.sass']
})
export class DetalleSolicitudComponent implements OnInit {
  
  public solicitud: any;
  detalle: {nro: number, anio: number};

  constructor(  private rutaActiva: ActivatedRoute,
                public api: SolicitudesItemsService ) { }

  ngOnInit() {
    this.detalle = {
      nro: this.rutaActiva.snapshot.params.nro,
      anio: this.rutaActiva.snapshot.params.anio,
    };
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
          if (value.id == this.detalle.nro) {
            if (value.anio == this.detalle.anio){
              moment.locale('es');
              value.tiempo = moment([this.formato(value.fecha_hora_estado)], "YYYY, MM, DD, h, mm, ss").fromNow();
              value.tiempoInterv =moment([this.formato(value.fecha_hora_intervencion)], "YYYY, MM, DD, h, mm, ss").fromNow();
              value.tiempoAsig =moment([this.formato(value.fecha_hora_asignacion)], "YYYY, MM, DD, h, mm, ss").fromNow();
              value.tiempoDeriv = moment([this.formato(value.fecha_hora_ult_derivacion)], "YYYY, MM, DD, h, mm, ss").fromNow();
              console.log(value.reiteraciones, value.cant_solicitantes);
              this.solicitud = value
            }};
        })
      });
      }

  formato(fecha){
    fecha = fecha.replace("/","-")
    fecha = fecha.replace("/", "-")
    fecha = fecha.replace(" ", "-")
    fecha = fecha.replace(":", "-")
    return fecha.replace(/^(\d{2})-(\d{2})-(\d{4})-(\d{2})-(\d{2})$/g,'$3, $2, $1, $4, $5')
  }

}