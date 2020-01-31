import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  mymap: L.Map;
  
  markers: L.Marker[] = [];

  constructor(public api: SolicitudesItemsService) { }
  public solicitudes: any[];

  myIcon = L.divIcon({
    className: 'fsua fsua-ubicacion fsua-3x',
    iconAnchor: [20, 15],
});

  ngOnInit() {
    this.mymap = new L.map('mapid').setView([-32.9668200, -60.6393200], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(this.mymap);
    this.setLayers();
    const group = new L.FeatureGroup(this.markers)
    group.addTo(this.mymap);
    //let marker= new L.Marker([-32.9511072, -60.6637368], {icon: this.myIcon});
    //marker.addTo(this.mymap).bindPopup("Ovidios Lagos 1520");
    console.log(this.mymap);
  }
  setLayers() {
    this.api.getSolic().subscribe(
      data => {
        data.forEach((value: { coord_x: any; coord_y: any; }) => {
          this.addMarker(value.coord_x, value.coord_y)
        })
        this.solicitudes = data
      });
     }
  addMarker(x: any,y: any){
    this.markers.push(new L.Marker({lng: x , lat: y}, {icon: this.myIcon}));
   }
}
