import { Injectable} from '@angular/core';
import { AdvSearch } from './filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { HttpClient } from '@angular/common/http';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { BehaviorSubject } from 'rxjs';

export interface Busqueda{
  dateRange_begin: Date,
  dateRange_end: Date,
  Id_solicitud: string,
  año: number,
  Dir: any,
  radio: number,
  Id_solicitante: string,
  advSearch: AdvSearch
}

export interface BusquedaSave{
  id: number,
  nombre: string,
  busqueda: Busqueda,
  cantFiltros: number,
}

export interface BusquedaSave2{
  nombre: string,
  busqueda: Busqueda,
  cantFiltros: number
}



@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  //private message = new BehaviorSubject<number>(0);

  //public customMessage = this.message.asObservable();

  constructor(private httpClient: HttpClient) { }

  apiURL = "http://localhost:3000"

  busquedaCompleta:Busqueda;
  aGuardar : BusquedaSave2;

  private filtroNumber  : number = 0;

  //si hay algo guardado en la session se carga en una variable, si no se inicializa vacio
  Init(){
    if(window.sessionStorage['busqueda']){
      this.busquedaCompleta = JSON.parse(window.sessionStorage['busqueda']);
      this.filtroNumber = window.sessionStorage['filtroCant'];
    }else{
      this.busquedaCompleta = {
        dateRange_begin: null,
        dateRange_end: null,
        Id_solicitud: "",
        año: null,
        Dir: null,
        radio: 0,
        Id_solicitante: "",
        advSearch: null,
    
      };
    }
  }

// se utilizara para inicializar la busqueda, por ahora solo guarda la busqueda en la session
  Buscar(busqueda: Busqueda, filtroCant?:number): void{
    console.log("se esta haciendo la busqueda");
    this.busquedaCompleta = this.copyBusquedas(busqueda);
    console.log("filtrosCant: " + filtroCant);
    this.filtroNumber = filtroCant;
    this.guardarEnSecion();
  }

  public copyBusquedas(from:Busqueda): Busqueda{
    let tempBusqueda:Busqueda;
    tempBusqueda = JSON.parse(JSON.stringify(from));
    tempBusqueda.advSearch = this.copyAdvsearch(from.advSearch);

    //main search fecha 
    if(typeof from.dateRange_begin == "string"){
      tempBusqueda.dateRange_begin = new Date(from.dateRange_begin);
    } 
    if(typeof from.dateRange_end == "string"){
      tempBusqueda.dateRange_end = new Date(from.dateRange_end);
    } 

    return tempBusqueda;
  }

  //funcion para copiar datos de advsearch
  public copyAdvsearch(from: AdvSearch):AdvSearch{
    let tempAdv:AdvSearch = JSON.parse(JSON.stringify(from));
    
    //fecha estado 
    if(typeof from.estado_fecha_end == "string"){
      tempAdv.estado_fecha_end = new Date(from.estado_fecha_end);
    } 
    if(typeof from.estado_fecha_start == "string"){
      tempAdv.estado_fecha_start = new Date(from.estado_fecha_start);
    } 

    //fecha intervenciones
    if(typeof from.intervenciones_fecha_end == "string"){
      tempAdv.intervenciones_fecha_end = new Date(from.intervenciones_fecha_end);
    } 
    if(typeof from.intervenciones_fecha_begin == "string"){
      tempAdv.intervenciones_fecha_begin = new Date(from.intervenciones_fecha_begin);
    } 

    //asignacion
    if(typeof from.asignacion_fecha_end == "string"){
      tempAdv.asignacion_fecha_end = new Date(from.asignacion_fecha_end);
    } 
    if(typeof from.asignacion_fecha_start == "string"){
      tempAdv.asignacion_fecha_start = new Date(from.asignacion_fecha_start);
    } 

    return tempAdv;
  }

  Guardar(search: Busqueda, name: string, cantf:number):void{
    this.aGuardar = {nombre: name, busqueda: search, cantFiltros: cantf};
    this.httpClient.post<BusquedaSave>(`${this.apiURL}/filtrosGuardados`, this.aGuardar).subscribe();
  }

  getBusquedas(){
    return this.httpClient.get<BusquedaSave>(`${this.apiURL}/filtrosGuardados`);
  }

  //almacena la busqueda en la session
  guardarEnSecion(){
    window.sessionStorage['busqueda'] = JSON.stringify(this.busquedaCompleta);
    window.sessionStorage['filtroCant'] = this.filtroNumber;

  }

  loadBusqueda(filtrosPrevios:BusquedaSave){
    this.busquedaCompleta = filtrosPrevios.busqueda;
    this.guardarEnSecion();
  }

  getCantFiltros():number{
    return this.filtroNumber;
  }


  /*public changeMessage(msg: number): void {
    this.message.next(msg);
  }*/
}
