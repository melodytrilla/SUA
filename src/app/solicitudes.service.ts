import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';



export interface Vecinal{
  msLink:number;
  numero: number;
  nombre: string;
  distrito: string;
  limites: string;

}

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  apiURL = "http://localhost:3000";
  api = "http://localhost:5000"

  //Vecinales variables ------------------------------------------------

  private _vecinalesAll: Vecinal[] = [];
  private _distritos: string[] = [];

  // -------------------------------------------------------------------

  constructor(private httpClient: HttpClient) { }

  //Obtiene los datos del banner del dashboard
  getAlertsStats (): Observable<Object> {
    return this.httpClient.get<Object>(
      `${this.apiURL}/alertas`);
  }

  getTopReclamosDenuncias () : Observable<any>{
    return this.httpClient.get<any>(
      `${this.apiURL}/reclamos`
    )
  }

  getTopConsultasTramites () : Observable<any>{
    return this.httpClient.get<any>(
      `${this.apiURL}/consultas`
    )
  }

  getSolicitudesporEstado (): Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/porEstado`
    )
  }

  getOpiniones(): Observable<any>{
    return this.httpClient.get<any>(
      `${this.apiURL}/Opinadas`
    )
  }

  get10Categorias(): Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/top10-categorias`
    )
  }

  get10Vecinales(): Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/top10-vecinales`
    )
  }

  getporDistrito():Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/porDistrito`
    )
  }

  getporOrigen():Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/porOrigen`
    )
  }

  getItems(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.apiURL}/items`
    )
  }

  getDatosVarios(titulo: string): Observable<any>{
    titulo = encodeURIComponent(titulo);
    return this.httpClient.get<any[]>(
      `${this.apiURL}/${titulo}`
    )
  }

  getAreas():Observable<string[]>{
    return this.httpClient.get<string[]>(
      `${this.apiURL}/Areas`
      )
  }

  //vecinales Handeling ------------------------------------------------

  getAllVecinales():void{
    this._vecinalesAll = [];
    this._distritos = [];
    this.httpClient.get<Vecinal[]>(
      `${this.apiURL}/Vecinales`
      ).subscribe(vecinal => {
        vecinal.forEach(elem => {
          this._vecinalesAll = this._vecinalesAll.concat(elem);
          if(this._distritos.indexOf(elem.distrito) == -1){
            this._distritos = this._distritos.concat(elem.distrito)
          }
        })
      })
  }

  getVecinales():Vecinal[]{
    return this._vecinalesAll;
  }

  getDistritos():string[]{
    return this._distritos;
  }

  filteredVecinalesSearch(value:string){
    let vecinalesBuscados: Vecinal[];


    vecinalesBuscados = this._vecinalesAll.filter(vecinal => this.filterVecinalFunc(vecinal, value));

    return vecinalesBuscados;
  }
  
  filterdeDistritosSearch(value:string, vecinales:Vecinal[]){
    let distritoBuscados: string[];

    let distritosPorValor = this._distritos.filter(distrito => this.filterDistritoFunc(distrito, value));

    let distritosPorVecinales: string[] = [];
    //terminar la busqueda por vecinales y despues concatenar todo en distritosBuscados
    //https://stackoverflow.com/questions/14115278/how-do-i-include-output-parameters-in-a-function-with-typescript
    vecinales.forEach(value =>{
      if(distritosPorVecinales.length == 0 || !(distritosPorVecinales.includes(value.distrito))){
        distritosPorVecinales = distritosPorVecinales.concat(value.distrito);
      }
    })

    distritoBuscados = distritosPorVecinales.concat(distritosPorValor.filter( x => distritosPorVecinales.every(y => y != x)));

    return distritoBuscados;
  }

  filterVecinalFunc(vecinal: Vecinal, value:string):boolean{
    let valuesArray = value.split(" ");
    valuesArray = valuesArray.filter( palabra => palabra != "");
    
    if(valuesArray.length == 0){
      return true;
    }

    for(let index = 0; index < valuesArray.length; index++){
      if(vecinal.nombre.toLocaleLowerCase().includes(valuesArray[index].toLocaleLowerCase())){
        return true;
      }
    }
    
    return false;
  }

  filterDistritoFunc(distrito: string, value:string): boolean{
    let valuesArray = value.split(" ");
    valuesArray = valuesArray.filter( palabra => palabra != "");
    
    if(valuesArray.length == 0){
      return true;
    }
    
    for(let index = 0; index < valuesArray.length; index++){
      if(distrito.toLocaleLowerCase().includes(valuesArray[index].toLocaleLowerCase())){
        return true;
      }
    }

    return false;
  }
}
