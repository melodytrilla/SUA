import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { NgElement, WithProperties } from '@angular/elements';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.sass'],
})
export class MapaComponent implements OnInit {
  asc= false;

  map: L.Map;

  constructor() { }

  public solicitudes: Array<any> = [
    {
      estado: "Resuelto",
      imagen: "http://4.bp.blogspot.com/-3s5RpPRPdv4/UcIE__NluhI/AAAAAAAAALc/Cz6EW-I-9YA/s1600/114139.jpg",
      tiempoPasado: "Hace mas de un mes",
      calificacion: 1,
      usuarios_calificaron: 1,
      info_icono:"fsua-reloj-o",
      info_tipo: "Corte de transito",
      info_descripcion: "esta es una descripcion medio larga asi que habra que cortarla"
    },
    {
      estado: "En Curso",
      imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.c3Bp-l_gMgBj77lsnqOb9wHaFj%26pid%3DApi&f=1",
      tiempoPasado: "Hace mas de un mes",
      calificacion: -1,
      usuarios_calificaron: 3,
      info_icono:"fsua-transito",
      info_tipo: "Mas problemas de transito",
      info_descripcion: "corta descripcion"
    },
    {
      estado: "En Curso",
      imagen: "http://www.pbs.org/wnet/nature/files/2017/10/reqzNZB-asset-mezzanine-16x9-dWu5cfN.jpg",
      tiempoPasado: "Hace mas de un mes",
      calificacion: 0,
      usuarios_calificaron: 2,
      info_icono:"fsua-transito",
      info_tipo: "Mas problemas de transito",
      info_descripcion: "corta descripcion"
    }
  ];

  ngOnInit() {
    this.init();
    this.solicitudes.forEach(function(solicitud) {
      if(solicitud.info_tipo.length > 30){
        solicitud.info_tipo = solicitud.info_tipo.substr(0, 27) + "...";
      }
      if(solicitud.info_descripcion.length > 50){
        solicitud.info_descripcion = solicitud.info_descripcion.substr(0, 47) + "...";
      }
   });
  }
  togglePlay(){
    this.asc = !this.asc;
  }

  init() {
    this.map = new L.Map('map', {
      layers: [L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { subdomains: ['a', 'b', 'c'], maxZoom: 19 })],
      center: new L.LatLng(-32.9478200, -60.6683200),
      zoomControl: false,
      zoom: 14
    });
  }
}
