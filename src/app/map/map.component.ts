import { Component, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import 'proj4leaflet';
import 'proj4';
import { IconosManagerService } from '../iconos-manager.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  map: L.Map;
  argCrs: any;
  @Output() selected = new EventEmitter<number>();
  
  constructor(public api: SolicitudesItemsService, public iconManager:IconosManagerService) { }

  ngOnInit() {
    this.argCrs = new L.Proj.CRS('EPSG:22185','+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ');
    this.map = new L.map('mapid').setView([-32.9493486, -60.6746665], 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
      }).addTo(this.map);
    this.setLayers();
  }
  
  setLayers() {
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
          this.addMarker(value);
        })
      });
  }

  getIcon(categoria:string, estado:string){
    return L.icon({iconUrl: this.iconManager.getSrc2(categoria, estado),
        iconSize:[50, 60], 
        iconAnchor:[25,60],
        popupAnchor:[0,-55]});
  }
  
  addMarker(value: any){
    let coord = this.convertToLatLng(value.coord_x, value.coord_y);
    let marker = new L.Marker({
      lat: coord.lat, lng: coord.lng},{
        title: value.subtipo, 
        icon: this.getIcon(value.categoria, value.estado)
      });

    marker.on('click', this.pressed.bind(this, value.id));
    marker.addTo(this.map)
      .bindPopup('<p>Categoría: ' + value.categoria +'</br>Subtipo: ' + value.subtipo +'</br> Estado: '+ value.estado +'</br> numero: '+ value.id+ '</p>');
  }

  convertToLatLng(x: number, y :number){
    let tempPoint = new L.Point(x,y);
    return this.argCrs.unproject(tempPoint)
  }

  moveMap(x:number, y:number){
    let coord = this.convertToLatLng(x,y);
    this.map.flyTo(coord,16)
  }

  pressed(a: number){
    this.selected.emit(a);
  }
}
