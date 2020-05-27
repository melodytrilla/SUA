import { Injectable} from '@angular/core';
import { AdvSearch } from './filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { HttpClient } from '@angular/common/http';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { BehaviorSubject } from 'rxjs';
import { Chip } from './chips-container/chips-container.component';

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
  private filtroNumber  : number = 0;
  private message = new BehaviorSubject<number>(0);

  public customMessage = this.message.asObservable();
  //private message = new BehaviorSubject<number>(0);

  //public customMessage = this.message.asObservable();

  constructor(private httpClient: HttpClient) { }

  public changeMessage(msg: number): void {
    this.message.next(this.filtroNumber);
  }

  apiURL = "http://localhost:3000"

  busquedaCompleta:Busqueda;
  aGuardar : BusquedaSave2;
  agOp: boolean = true;

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
        advSearch: {
    //-----Busqueda Reporte ----------------------------------------------
    reiteraciones_con:true,
    reiteraciones_sin:true,
    prioridad:undefined,

    //--------------------------------------------------------------------

    //-----Busqueda Clasificacion ----------------------------------------
    clasificacion_subtipo: [],
    clasificacion_tipo:undefined,
    clasificacion_origenes: [],
    clasificacion_registro:true,
    clasificacion_reiteracion :true,

    //--------------------------------------------------------------------

    //-----Busqueda Area -------------------------------------------------
    area_origen:undefined,
    area_destino:undefined,
    area_reiteracion:undefined,

    //--------------------------------------------------------------------
  
    //-----Busqueda Adjunto ----------------------------------------------
    adjunto_tiene:"no",
    adjunto_regReit: false,
    adjunto_intervencion: false,
    adjunto_resolucion: false,
    
    //--------------------------------------------------------------------

    //-----Busqueda Opinion ----------------------------------------------
    opinion_tiene:"no",
    opinion_positivo:false,
    opinion_negative:false,
    opinion_neutro:false,

    //--------------------------------------------------------------------

    //-----Busqueda Estado ----------------------------------------------
    estado_estados:[],
    estado_detallado: "",
    estado_fecha_start: null,
    estado_fecha_end: null,

    //--------------------------------------------------------------------

    //-----Busqueda Distrito ----------------------------------------------
    distrito_vecinales: [],

    //--------------------------------------------------------------------

    //-----Busqueda Intervenciones ---------------------------------------
    intervenciones_seleccionadas:[],
    intervenciones_suaMovile:false,
    intervenciones_tipo:"",
    intervenciones_fecha_begin:null,
    intervenciones_fecha_end: null,

    //--------------------------------------------------------------------

    //-----Busqueda Equipamiento -----------------------------------------
    equipamiento_seleccionado:"",
    equipamiento_choice:"",
    equipamiento_detalle:"",

  //--------------------------------------------------------------------

  //-----Busqueda Asignacion -----------------------------------------
    asignacion_tipo:"",
    asignacion_fecha_start: null,
    asignacion_fecha_end: null,
    asignacion_listPersonas:[],

//--------------------------------------------------------------------
    
//-----Datos especificos--------------------------------------------
    Datos_Extra:undefined
        },
    
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

  agregarSubtipo(a: Chip): void {
    console.log(a)
    if(!this.busquedaCompleta.advSearch.clasificacion_subtipo.includes(a)){
      this.busquedaCompleta.advSearch.clasificacion_subtipo.push(a)
    }
    if (this.busquedaCompleta.advSearch.clasificacion_subtipo.length == 1){
      this.filtroNumber++;
    }
    this.guardarEnSecion()
  }
  borrarSubtipo(a: string):void {
    let indexFound: number =  this.busquedaCompleta.advSearch.clasificacion_subtipo.findIndex(chipSearch => chipSearch.descripcion == a)
    if(indexFound > -1){
      this.busquedaCompleta.advSearch.clasificacion_subtipo.splice(indexFound, 1);
    }
    if (this.busquedaCompleta.advSearch.clasificacion_subtipo.length == 0 && this.filtroNumber > 0){
      this.filtroNumber--;
    }
  }
  agregarEstado(a){
    if(!this.busquedaCompleta.advSearch.estado_estados.includes(a)){
      this.busquedaCompleta.advSearch.estado_estados.push(a)
    }
    console.log(this.busquedaCompleta.advSearch.estado_estados)
    if (this.busquedaCompleta.advSearch.estado_estados.length == 1){
      this.filtroNumber++;
    }
    this.guardarEnSecion()
  }
  borrarEstado(a){
    for (let estado of this.busquedaCompleta.advSearch.estado_estados){
      if (estado == a){
        this.busquedaCompleta.advSearch.estado_estados = this.busquedaCompleta.advSearch.estado_estados.filter(est => est!= estado);
      }
    }
    if (this.busquedaCompleta.advSearch.estado_estados.length == 0 && this.filtroNumber > 0){
      this.filtroNumber--;
    }
    this.guardarEnSecion()
  }
  agregarOpinion(a: string):void{
    this.busquedaCompleta.advSearch.opinion_tiene = "Con"
    if (a == 'Positivas'){
      this.busquedaCompleta.advSearch.opinion_positivo = true
    }
    else if (a == 'Negativas'){
      this.busquedaCompleta.advSearch.opinion_negative = true
    }
    else if (a == 'Neutral'){
      this.busquedaCompleta.advSearch.opinion_neutro = true
    }
    if (this.agOp == true){
      this.filtroNumber++;
      this.agOp = false
    }
    this.guardarEnSecion()
  }
  borrarOpinion(a: string): void{
    if (a == 'Positivas'){
      this.busquedaCompleta.advSearch.opinion_positivo = false
    }
    else if (a == 'Negativas'){
      this.busquedaCompleta.advSearch.opinion_negative = false
    }
    else if (a == 'Neutral'){
      this.busquedaCompleta.advSearch.opinion_neutro = false
    }
    if (!this.busquedaCompleta.advSearch.opinion_positivo && !this.busquedaCompleta.advSearch.opinion_negative && !this.busquedaCompleta.advSearch.opinion_neutro){
      this.busquedaCompleta.advSearch.opinion_tiene= "no"
      if (this.filtroNumber > 0){
        this.filtroNumber--;
      }
      this.agOp= true;
    }
    this.guardarEnSecion()
  }
  agregarBanner(a: string):void{
    if (a == 'reiteradas'){
      this.busquedaCompleta.advSearch.reiteraciones_sin = false;
    }
    else if (a == 'sinInter'){
      this.busquedaCompleta.advSearch.intervenciones_tipo = "sin";
    }
    else if (a == 'sinAsig'){
      this.busquedaCompleta.advSearch.asignacion_tipo = "sin";
    }
    this.filtroNumber++;
    this.guardarEnSecion();
  }
  borrarBanner(a: string): void{
    if (a == 'reiteradas'){
      this.busquedaCompleta.advSearch.reiteraciones_sin = true;
    }
    else if (a == 'sinInter'){
      this.busquedaCompleta.advSearch.intervenciones_tipo = "";
    }
    else if (a == 'sinAsig'){
      
      this.busquedaCompleta.advSearch.asignacion_tipo = "";
    }
    if(this.filtroNumber > 0){
      this.filtroNumber--;
    }
    this.guardarEnSecion();
  }
  /*public changeMessage(msg: number): void {
    this.message.next(msg);
  }*/

}
