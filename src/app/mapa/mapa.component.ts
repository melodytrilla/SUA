import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
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
  map: L.Map;

  constructor(public api: SolicitudesItemsService) { }

  public solicitudes: any[];
  markers: L.Marker[] = [];

  svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>'
  iconUrl = 'data:image/svg+xml;base64,' + btoa(this.svg);

  myIcon = L.icon({
    iconUrl: this.iconUrl,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

  ngOnInit() {
    this.init();
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

  init() {
    this.map = new L.Map('map', {
      layers: [L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { subdomains: ['a', 'b', 'c'], maxZoom: 19 })],
      center: new L.LatLng(-32.9468200, -60.6393200),
      zoomControl: false,
      zoom: 14
    });
    this.map.createPane('foo');
    this.map.getPane('foo').style.zIndex = '401';
    this.setLayers();
    const group = new L.FeatureGroup(this.markers, {pane: 'foo'})
    group.addTo(this.map);
    console.log(this.map)
  }

  setLayers() {
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
          this.markers.push(new L.Marker({lat: value.coord_x, lng: value.coord_y}, {icon: this.myIcon, pane: 'foo'}));  
      })
  });
}

}
