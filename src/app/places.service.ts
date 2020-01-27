import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Geometry{
  type:string,
  coordinates: number[]
}

export interface Altura{
  alturaDesde: number,
  alturaHasta: number,
  bis: boolean,
  letra: string
}

export interface Properties{
  //estos datos son de ambos tipos de direcciones
  id: number,
  name: string,
  subtipo: string,
  //estos datos son de las direcciones no puntos
  rasgosAltura: Altura[]
  // estos datos son exclusivos de los puntos
  altura: number,
  atencion: string,
  bis: boolean,
  calle: string,
  direccion: string,

}

export interface Direccion{
  geometry: Geometry,
  properties: Properties,
  type: string
}
 

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  busquedaURL_prefix = "https://ws.rosario.gob.ar/ubicaciones/public/geojson/ubicaciones?term=";
  busquedaURL_sufix = "&extendido=true&conOtrasLocalidades=false";

  places = ['Francia', 'Pellegrini', 'Mendoza', 'San Juan', 'Oroño', 'Alaska', 'Montevideo'];
  direcciones:Observable<Direccion[]>;

  constructor(private httpClient: HttpClient) { }
  
  getPlaces (): String[] {
    return this.places
  }
/*
  testBusqueda(dir:string): void{
    let newDir = encodeURIComponent(dir);
    let resultados = this.httpClient.get<any[]>(
      `${this.busquedaURL_prefix}${newDir}${this.busquedaURL_sufix}`
    );
    resultados.subscribe(data => {
      this.direcciones = data["features"];
      this.direcciones.forEach(function (dir) {
        console.log(dir.geometry);
      });
    });
  }
*/
  getDirecciones(dir:string): Observable<Direccion[]>{
    let newDir = encodeURIComponent(dir);
    newDir = this.busquedaURL_prefix + newDir + this.busquedaURL_sufix;
    this.direcciones = this.httpClient.get<any[]>(
      `${newDir}`
    );
    return this.direcciones;
  }

}
