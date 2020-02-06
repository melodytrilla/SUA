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

  ngOnInit() {
    var argCrs = new L.Proj.CRS('EPSG:22185',
    '+proj=tmerc +lat_0=-90 +lon_0=-60 +k=1 +x_0=5500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ').default;
    this.mymap = new L.map('mapid').setView([-32.9493486, -60.6746665], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
}).addTo(this.mymap);
    this.setLayers();
    var newPoint = new L.Point(5438909.74157222,6354364.200221464);
    console.log(newPoint);

    //var crs = L.CRS.EPSG3857;
    console.log(argCrs);
    
    var latLong = argCrs.unproject(newPoint);
    console.log(latLong);
    this.mymap.panTo(latLong);
    console.log(this.mymap)
  }
  
  

  setLayers() {
    this.api.getSolicitudes().subscribe(
      data => {
        data.forEach(value => {
          this.addMarker(value.coord_x, value.coord_y, value.categoria, value.subtipo, value.estado)
        })
      });
     }
  addMarker(x, y, cat, subt, est){
    let a = new L.Marker({lat: x, lng: y}, {icon: this.myIcon});
    a.addTo(this.mymap).bindPopup('<p>Categoría: <p>', cat, '</br><p>jk</p>');
};


}
