import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { NgElement, WithProperties } from '@angular/elements';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  map: L.Map;
  cameras = [
    { id: 1, lat: 53.92058, lng: 21.51282 },
    { id: 2, lat: 53.92058, lng: 21.51482 },
    { id: 3, lat: 53.92058, lng: 21.51682 },
    { id: 4, lat: 53.92058, lng: 21.51882 },
    { id: 5, lat: 53.92058, lng: 21.52082 },
    { id: 6, lat: 53.92058, lng: 21.52282 }
  ];
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

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.map = new L.Map('map', {
      layers: [L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { subdomains: ['a', 'b', 'c'], maxZoom: 19 })],
      center: new L.LatLng(53.92058, 21.51282),
      zoomControl: false,
      zoom: 15
    });

    this.map.createPane('foo');
    this.map.getPane('foo').style.zIndex = '401';
    this.setLayers();
    const group = new L.FeatureGroup(this.markers, {pane: 'foo'})
    group.addTo(this.map);
    console.log(this.map)
  }

  setLayers() {
    this.cameras.forEach(camera => {
      this.markers.push(new L.Marker({lat: camera.lat, lng: camera.lng}, {icon: this.myIcon, pane: 'foo'}));
    });
  }

}
