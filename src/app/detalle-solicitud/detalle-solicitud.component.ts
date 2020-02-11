import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.sass']
})
export class DetalleSolicitudComponent implements OnInit {
  
  solicitud = {
  id: 4180,
  numero: 1,
  anio: 2020,
  tipo: "Reclamo",
  subtipo: "Sector apagado ó encendido",
  categoria: "Alumbrado",
  fecha_hora_registro: "27/01/2020 09:00",
  hora_registro: "11:35",
  area_origen: "Alumbrado Público Zona 2",
  estado: "En curso",
  fecha_hora_estado: "15/01/2020 11:36",
  hora_estado: "11:36",
  usuario_registro: "agarbag0",
  prioridad: "ALTA",
  reiteraciones: 1,
  area_ultima_derivacion: "Alumbrado Público Zona 2",
  origen: "Externo",
  distrito: "CENTRO",
  vecinal: "-1 Sin Vecinal",
  cant_solicitantes: 1,
  ident_reservada: 0,
  usuario_ult_derivacion: "agarbag0",
  fecha_hora_ult_derivacion: "15/01/2020 11:35",
  hora_ult_derivacion: "11:35",
  fecha_hora_recepcion: "15/01/2020 11:36",
  hora_recepcion: "11:36",
  coord_x: -32.951107,
  coord_y: -60.663737,
  secretaria: "SECRETARIA DE AMBIENTE Y ESPACIO PUBLICO",
  id_calle: 3689,
  calle: "LAGOS OVIDIO",
  interseccion: "",
  altura: 1520,
  bis: "",
  letra: "",
  piso: "",
  depto: "",
  monoblock: "",
  doc_solicitante: "DNI",
  nro_doc_solicitante: 37073611,
  nombre_solicitante: "ATAHUALPA",
  apellido_solicitante: "DE SAN BENITO",
  descripcion: "EL ciudadano se comunica para reclamar por sector apagado",
  fecha_hora_intervencion: "16/01/2020 08:05",
  hora_primer_intervencion: "08:05",
  tipo_intervencion: "Reparado",
  detalle_intervencion: "se constato la falla. se reparo problema",
  fuente: "SUA Móvil",
  usuario_intervencion: "agarbag0",
  area_intervencion: "Alumbrado Público Zona 2",
  fecha_hora_asignacion: "16/01/2020 07:51",
  hora_registro_asignacion: "07:51",
  equipo_asignado: "Alejandra Garbagna",
  detalle_asignacion: "para su ejecucion",
  detalle_solucion: "sasa djauewd",
  motivo_cierre: "",
  opinion: "neutro",
  etiqueta_equipamiento: "Liniers Santiago A De 2756",
  descripcion_equipamiento: "Alambre",
  detalle_equipamiento: "Responsable: Alumbrado Público Zona 2",
  cantInterv: 3,
  cantMap: 1,
  cantTel: 1,
  cantLogo: 2,
  cantRiesgo: 0,
  imagen: "http://moron.enorsai.com.ar/upload/news/moron/56c49a3f38932_crop.JPG",
  tiempo: "",
  tiempoInterv:"",
  tiempoMap: "",
  cant_opiniones: "2"
}

  constructor() { }

  ngOnInit() {
    moment.locale('es');
    this.solicitud.tiempo = moment([this.formato(this.solicitud.fecha_hora_estado)], "YYYY, MM, DD, h, mm, ss").fromNow();
    this.solicitud.tiempoInterv =moment([this.formato(this.solicitud.fecha_hora_intervencion)], "YYYY, MM, DD, h, mm, ss").fromNow();
    this.solicitud.tiempoMap =moment([this.formato(this.solicitud.fecha_hora_asignacion)], "YYYY, MM, DD, h, mm, ss").fromNow();
      }

  formato(fecha){
    fecha = fecha.replace("/","-")
    fecha = fecha.replace("/", "-")
    fecha = fecha.replace(" ", "-")
    fecha = fecha.replace(":", "-")
    return fecha.replace(/^(\d{2})-(\d{2})-(\d{4})-(\d{2})-(\d{2})$/g,'$3, $2, $1, $4, $5')
  }

}
