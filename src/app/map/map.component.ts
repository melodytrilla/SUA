import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import 'proj4leaflet';
import 'proj4';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  mymap: L.Map;
  
  constructor(public api: SolicitudesItemsService) { }

  myIcon = L.divIcon({
    className: 'fsua fsua-ubicacion fsua-3x',
    iconAnchor: [20, 32],
  });

  argCrs: any;
  num: number = 0;

  ngOnInit() {
    this.argCrs = new L.Proj.CRS('EPSG:22185',
    '+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ');

    this.mymap = new L.map('mapid').setView([-32.9493486, -60.6746665], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
      }).addTo(this.mymap);
    this.setLayers();

  }
  
  

  setLayers() {
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
          let tempLatLng = this.convertToLatLng(value.coord_x, value.coord_y);

          this.addMarker(tempLatLng.lat, tempLatLng.lng, value.categoria, value.subtipo, value.estado, value.numero);
          this.num++;
        })
      });
    }
  
  
  addMarker(x: number, y: number, categoria: string, subtipo:string, estado:string, nume:number){
    let a = new L.Marker({lat: x, lng: y}, {icon: this.myIcon});
    a.addTo(this.mymap).bindPopup('<p>Categoría: ' + categoria +'</br>Subtipo: ' + subtipo +'</br> Estado: '+ estado +'</br> numero: '+ nume + '</p>');
  }

  convertToLatLng(x: number, y :number){
    let tempPoint = new L.Point(x,y);
    return this.argCrs.unproject(tempPoint)
  }


}
