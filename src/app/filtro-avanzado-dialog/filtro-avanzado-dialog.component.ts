import { Component, OnInit, OnDestroy,  Inject, Input, ViewChild, ElementRef, ContentChild, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioGroup, MatSelect } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {DateRangePicker} from '../date-range-picker/date-range-picker.component';

import { Chip, ChipsContainerComponent } from '../chips-container/chips-container.component';
import { BusquedaService } from '../busqueda.service';
import { SolicitudesService, Vecinal } from '../solicitudes.service';
import { SatDatepickerRangeValue } from 'saturn-datepicker';


export interface AdvSearch{
  // Los nuevos parametros a guardar
  //Reporte
  reiteraciones_con:boolean;
  reiteraciones_sin:boolean;
  prioridad:string;

  //Clasificacion
  clasificacion_subtipo: Chip[];
  clasificacion_tipo:string;
  clasificacion_origenes: string[];
  clasificacion_registro:boolean;
  clasificacion_reiteracion :boolean;

  //Area
  area_origen:string;
  area_destino:string;
  area_reiteracion: string;

  //Adjunto
  adjunto_tiene:string;
  adjunto_regReit: boolean;
  adjunto_intervencion: boolean;
  adjunto_resolucion: boolean;
  
  //Opinion
  opinion_tiene:string;
  opinion_positivo:boolean;
  opinion_negative:boolean;
  opinion_neutro:boolean;

  //Estado
  estado_estados:string[];
  estado_detallado: string;
  estado_fecha_start: Date;
  estado_fecha_end: Date;

  //Distrito
  distrito_vecinales: Vecinal[];

  //Intervenciones
  intervenciones_seleccionadas:string[];
  intervenciones_suaMovile:boolean;
  intervenciones_tipo:string,
  intervenciones_fecha_begin: Date;
  intervenciones_fecha_end: Date;

  //Equipamiento
  equipamiento_seleccionado:string;
  equipamiento_choice:string;
  equipamiento_detalle:string;

  //Asignaciones
  asignacion_tipo:string;
  asignacion_fecha_start: Date;
  asignacion_fecha_end: Date;
  asignacion_listPersonas:string[];

  //Datos especificos
  Datos_Extra:any[];
  //

  /*
  filtros: Chip[];
  Originadas_dirTransito: boolean;
  con_Intervenciones: string;
  intervenciones_fechaStart: Date;
  intervenciones_fechaEnd: Date;
  */
}


@Component({
  selector: 'app-filtro-avanzado-dialog',
  templateUrl: './filtro-avanzado-dialog.component.html',
  styleUrls: ['./filtro-avanzado-dialog.component.sass']
})
export class FiltroAvanzadoDialogComponent implements OnInit, OnDestroy{

  //una variable donde se guardaran todos los valores y asociaran algunos valores de la forma
  advSearch: AdvSearch = {
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
    Datos_Extra:[]
      
    /*
    filtros: [],
    Originadas_dirTransito: false,
    con_Intervenciones: "",
    intervenciones_fechaStart: null,
    intervenciones_fechaEnd: null
    */
  };
  savePressed:boolean = false;
  datesControl = new FormControl('');

  //referencia al elemento chips conteiner
  @ViewChild(ChipsContainerComponent, {static: false})
  private myChips: ChipsContainerComponent;

  //usar un output para mandar el advSerch al padre

  //variables para los paneles expansores
  readonly default_descripcion: string = "Descripción temporal";
  inputDescripcion="";

  //Datos de busqueda ---------------------------------------------------
  //-----Busqueda Reporte ----------------------------------------------
  public descripcionReporte: string = this.default_descripcion;

  //--------------------------------------------------------------------

  //-----Busqueda Clasificacion ----------------------------------------
  @ViewChild('origenSelect', {static: false}) origenSelect: MatSelect;
  
  public descripcionCalif:string = this.default_descripcion; 

  tipos :string[]= ["Emergencia", "Suceso", "Reclamo", "Consulta", "Sugerencia", "Denuncia", "Trámite"]

  origenes:string[] = ["Telefónico", "Personal", "Facebook", "Twitter", "Contacto Web", "Nota/Expediente", "VVV", "MR", "Externo", "MR Móvil", "Sensor", "Vecino Móvil"]

  //--------------------------------------------------------------------
  
  //-----Busqueda Area -------------------------------------------------
  public descripcionArea:string = this.default_descripcion; 
  area_areas:string[] = [];
  //--------------------------------------------------------------------
  
  //-----Busqueda Adjunto ----------------------------------------------
  public descripcionAdjunto: string;
  
  dis: boolean= true;
  //--------------------------------------------------------------------

  //-----Busqueda Opinion ----------------------------------------------
  public descripcionOpinion: string;
  
  disOp: boolean= true;

  //--------------------------------------------------------------------

  //-----Busqueda Estado ----------------------------------------------
  @ViewChild('estadoBuscador', {static: false}) estadoBuscador:MatSelect;

  descripcionEstado:string = "";

  estados_total:string[] = ["Resuelto", "Cerrado", "En curso", "Pendiente", "Archivado de oficio"];
  detallados_total:string[] = ["Derivado", "Resuelto con aviso", "Resuelto", "Resuelto sin aviso", "Archivado de oficion", "Rechazado", "Pendiente", "Cerrado"];

  estado_DateRango: SatDatepickerRangeValue<Date> = {begin: null, end: null};

  //--------------------------------------------------------------------

  //-----Busqueda Distrito ----------------------------------------------
  @ViewChild('search', {static: false}) searchElement: ElementRef;

  descripcionDistrito:string = "";

  filteredDistritos: string[] = [];
  filteredVecinales: Vecinal[] = [];

  separatorKeys: number[] = [ENTER, COMMA];
  
  //--------------------------------------------------------------------

  //-----Busqueda Intervenciones ---------------------------------------
  @ViewChild('intervencionSelect', {static: false}) intSelect: MatSelect;
  
  intervenciones:string[] = ["Acta de Informacion", "Constatado", "No constatado"];
  intervencionesSelecionadas:string[] = [];

  intervenciones_DateRango: SatDatepickerRangeValue<Date> = {begin: null, end: null}

  descripcionInt:string;

  //--------------------------------------------------------------------

  //-----Busqueda Equipamiento -----------------------------------------

  equipamiento_tipo:string[] = ["Alumbrado-columna", "Cámara-bicis públicas", "Semáforo-semáforo"];

  descripcionEqp:string = "";

  //--------------------------------------------------------------------

  //-----Busqueda Asignacion -----------------------------------------
  @ViewChild('equipoSearch', {static: false}) equipoSearch:ElementRef;

  descripcionAsig:string = "";

  List_Personas_Total: string[] = ["Ayelen Carbone", "D'Arrigo Florencia", "Fede Movil"];
  List_Personas: string[] = [];

  asigDate:SatDatepickerRangeValue<Date> = {begin: null, end: null};

  //--------------------------------------------------------------------
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FiltroAvanzadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitud:SolicitudesService,
    private busqueda: BusquedaService) 
    {

    }

  //form: FormGroup;

  ngOnInit() {

    //inicializa los valores del advSerch si hay algunos guardado en la session
    if(this.busqueda.busquedaCompleta.advSearch){
      console.log(this.busqueda.busquedaCompleta.advSearch);
      this.advSearch =  Object.assign({}, this.busqueda.busquedaCompleta.advSearch);
      
      //this.datesControl.setValue({begin: this.advSearch.intervenciones_fechaStart,
      //                          end: this.advSearch.intervenciones_fechaEnd});
    }

  /*  this.form = this.formBuilder.group({
      prioridad: '',

      estados: [],
      estadoDates: {
        begin: '', 
        end: ''
      },

      categorias: [],
      tipos: [],
      subtipos: [],
      distritos: [],
      vecinales: [],

      reiterado: false,
      reiteradoDates: {
        begin: '', 
        end: ''
      },

    });*/

    this.solicitud.getAllVecinales();


    //inicializacion de los paneles expansores
    this.ActualizarDescReporte();
    this.ActualizarDescCalificacion();
    this.ActualizarDescAdjunto();
    this.ActualizarDescOpinion();
    this.ActualizarEstado();
    this.ActualizarDescDistrito();
    this.ActualizarDescInt();
    this.ActualizarDescEqp();
    this.ActualizarDescAsig();
  }

  ngOnDestroy(){
    console.log("destroy called");
    if(this.savePressed){
      this.advSearch.clasificacion_subtipo = this.myChips.guardarChips();
      this.data.busqueda.advSearch = this.advSearch;
      //console.log(this.data);
      this.busqueda.Buscar(this.data.busqueda);
      this.savePressed = false;
      console.log("destroy save");
    }else{
      this.advSearch = this.data.busqueda.advSearch;
      console.log("destroy not save");
    }
  }


  // cierra la ventana al apretar cancelar
  onNoClick(): void {
    /*console.log(this.advSearch);
    this.advSearch = this.data.busqueda.advSearch;
    console.log(this.data);
    console.log("after...");
    console.log(this.advSearch);*/
    
    this.dialogRef.close();
  }

  //agarra todos los valores puestos en el formulario y se los pasa con
  //los de la busqueda principal al servicio de busqueda
  BusquedaClick():void{
    /*console.log(this.advSearch);
    this.advSearch.clasificacion_subtipo = this.myChips.guardarChips();
    //console.log(this.datesControl.value);

    //this.advSearch.intervenciones_fechaStart = this.datesControl.value.begin;
    //this.advSearch.intervenciones_fechaEnd = this.datesControl.value.end;

    //console.log(this.advSearch);
    this.data.busqueda.advSearch = this.advSearch;
    console.log(this.data);
    this.busqueda.Buscar(this.data.busqueda);*/
    this.savePressed = true;
    this.dialogRef.close();
  }

  //* Date picker props
  inlineRange;
  rangesFooter = DateRangePicker;
  inlineRangeChange($event) {
    this.inlineRange = $event;
  }
  // ********

//esta funcion se utiliza para verifiar los 
//cambios en los valores de el selector de fechas
  onDateChange(): void{
    console.log(this.datesControl.value);
  }


  //para actualizar la descripcion y color del panel reporte------------
  ActualizarDescReporte(){
    if(!this.advSearch.reiteraciones_con && !this.advSearch.reiteraciones_sin){
      this.advSearch.reiteraciones_con = true;
      this.advSearch.reiteraciones_sin = true;
    }
    this.inputDescripcion = this.InputADescripcionReporte();

    if(!(this.advSearch.reiteraciones_con && this.advSearch.reiteraciones_sin && this.advSearch.prioridad == undefined)){
      this.turnOn("ReportePanel", "inputField");

      this.descripcionReporte = this.inputDescripcion;
    }else{
      this.turnOff("ReportePanel", "inputField")
      
      this.descripcionReporte = this.inputDescripcion;
    }
  }

  //genera la nueva descripcion de reporte
  InputADescripcionReporte(): string{
    let desc:string = "";

    //reiteraciones
    if(this.advSearch.reiteraciones_con && this.advSearch.reiteraciones_sin){
      desc = desc.concat("No se filtra por reiteraciones ");
      
    }else{
      if(this.advSearch.reiteraciones_sin){
        desc = desc.concat("Sin reiteraciones ");
      }else{
        desc = desc.concat("Con reiteraciones ");
      }
    } 

    if(this.advSearch.prioridad != undefined){
      desc = desc.concat( "| Prioridad: " + this.advSearch.prioridad);
    }else{
      desc = desc.concat("| Cualquier prioridad");
    }

    return desc;
  }
  //----------------------------------------------------------------------

  //para catualizar la Calificacion --------------------------------------

  agregarChipOrigen(origen:string):void{
    /*
    if(this.origenesSeleccionados.length == 0){
      this.origenesSeleccionados = this.origenesSeleccionados.concat(origen);
    }else{
      if(!this.origenesSeleccionados.includes(origen)){
        this.origenesSeleccionados = this.origenesSeleccionados.concat(origen);
      }  
    }*/
    if(origen != "" && this.origenSelect.panelOpen){
      if(!this.advSearch.clasificacion_origenes.includes(origen)){
        this.advSearch.clasificacion_origenes.push(origen);
      }
      console.log(this.advSearch.clasificacion_origenes);
    }
    this.origenSelect.value = "";
  } 

  takeOut(elegido:string):void{
    this.advSearch.clasificacion_origenes = this.advSearch.clasificacion_origenes.filter((elem) => {return elem != elegido});
    //console.log(this.origenesSeleccionados);
  }

  ActualizarDescCalificacion(){
    if(!this.advSearch.clasificacion_registro && !this.advSearch.clasificacion_reiteracion){
      this.advSearch.clasificacion_registro = true;
      this.advSearch.clasificacion_reiteracion = true;
    }
    this.inputDescripcion = this.InputADescripcionCalificacion();

    if(this.CalificacionCheck()){
      this.turnOn("CalifPanel", "CalifFont");
      if(this.myChips != undefined){
        this.advSearch.clasificacion_subtipo = this.myChips.guardarChips();
      }
      this.descripcionCalif = this.inputDescripcion;
    }else{
      this.turnOff("CalifPanel", "CalifFont")
      
      this.advSearch.clasificacion_subtipo = [];
      this.descripcionCalif = this.inputDescripcion;
    }
  }

  CalificacionCheck():boolean{
    if(this.myChips != undefined){
      if(this.myChips.chipsLength() > 0){
        return true;
      }
    }
    if(this.advSearch.clasificacion_tipo != undefined || this.advSearch.clasificacion_origenes.length > 0){
      return true;
    }
    
    return false;
  }

  //genera la nueva descripcion de reporte
  InputADescripcionCalificacion(): string{
    let desc:string = "";

    //reiteraciones
    if(this.myChips != undefined){
      if(this.myChips.chipsLength() > 0){
        desc = desc.concat( "cantidad de filtros " + this.myChips.chipsLength() + ". ");
      }
    } 
    if(this.advSearch.clasificacion_tipo != undefined){
      desc = desc.concat( "Tipo: " + this.advSearch.clasificacion_tipo + " ");
    }else{
      desc = desc.concat("Cualquier tipo ");
    }
    if(this.advSearch.clasificacion_origenes.length > 0){
      if(this.advSearch.clasificacion_registro===false && this.advSearch.clasificacion_reiteracion===false){
        desc = desc.concat("| Origen: " + this.advSearch.clasificacion_origenes[0] + " ");
        }
      if (this.advSearch.clasificacion_registro===true && this.advSearch.clasificacion_reiteracion===false ){
          desc = desc.concat("| Origen de registro: " + this.advSearch.clasificacion_origenes[0] + " ");
          }
      if(this.advSearch.clasificacion_reiteracion===true && this.advSearch.clasificacion_registro===false ){
        desc = desc.concat("| Origen de reiteración: " + this.advSearch.clasificacion_origenes[0] + " ");
          }
      if(this.advSearch.clasificacion_reiteracion===true && this.advSearch.clasificacion_registro===true ){
        desc = desc.concat("| Origen de registro y reiteración: " + this.advSearch.clasificacion_origenes[0] + " ");
          }
      if(this.advSearch.clasificacion_origenes.length > 1){
        desc = desc.concat("+" + (this.advSearch.clasificacion_origenes.length - 1));
      }
    }
    else {
      desc = desc.concat("| Todos los orígenes")
    }
    return desc;
  }

  //----------------------------------------------------------------------

  //Para actualizar Area -------------------------------------------------

  updateAutocomplete(value: string):void{
    this.area_areas = [];
    this.solicitud.getAreas().subscribe(result =>
      this.area_areas = result.filter((area) => {
        return (area.toLowerCase()).includes(value);
        }
      ))
  }

  ActualizarDescArea(){
    this.inputDescripcion = this.InputADescripcionArea();

    if(this.AreaCheck()){
      this.turnOn("AreaPanel", "");

      this.descripcionArea = this.inputDescripcion;
    }else{
      this.turnOff("AreaPanel", "")
      
      this.descripcionArea = this.default_descripcion;
    }
  }

  InputADescripcionArea():string{
    let desc:string = "";
    //let cantDesc = 0;

    if(this.advSearch.area_origen){
      desc = desc.concat("Origen: " + this.advSearch.area_origen);
      //cantDesc += 1;
    }


    if(this.advSearch.area_destino){
      /*if(cantDesc > 0){
        desc = desc.concat(", ");
      }*/
      desc = desc.concat("| Destino: " + this.advSearch.area_destino);
    }


    if(this.advSearch.area_reiteracion){
      /*if(cantDesc > 0){
        desc = desc.concat(", ");
      }*/
      desc = desc.concat("| Reiteración: " + this.advSearch.area_reiteracion);
    }
    return desc;
  }

  AreaCheck():boolean{
    if(this.advSearch.area_origen  || this.advSearch.area_destino || this.advSearch.area_reiteracion){
      return true;
    }
    return false;
  }

  //---------------------------------------------------------------------


  //Para actualizar Adjuntos --------------------------------------------

  checkEnable(event){
    if(event.value == "no"){
      this.dis = true;
    }else{
      this.dis = false;
    }
  }

  ActualizarDescAdjunto(){
    if(this.advSearch.adjunto_tiene!= "no" && !this.advSearch.adjunto_regReit && !this.advSearch.adjunto_intervencion && !this.advSearch.adjunto_resolucion){
      this.advSearch.adjunto_regReit = true;
      this.advSearch.adjunto_intervencion = true;
      this.advSearch.adjunto_resolucion = true;
    }
    this.inputDescripcion = this.InputADescripcionAdjunto();

    if(this.advSearch.adjunto_tiene != "no"){
      this.turnOn("AdjuntoPanel", "AdjuntoFont");

      this.descripcionAdjunto = this.inputDescripcion;
    }else{
      this.turnOff("AdjuntoPanel", "AdjuntoFont")
      
      this.descripcionAdjunto = this.inputDescripcion;
    }
  }

  InputADescripcionAdjunto(): string{
    let desc:string = "";

    if(this.advSearch.adjunto_tiene == "no"){
      desc = "No se filtra por adjuntos"
    }else{
      desc = desc.concat(this.advSearch.adjunto_tiene + " adjuntos en ");
      let count = 0;
      if(this.advSearch.adjunto_regReit){
        desc = desc.concat("Registro/Reiteración");
        count += 1;
      }

      if(this.advSearch.adjunto_intervencion){
        if(count>0){
          if (this.advSearch.adjunto_resolucion){
          desc = desc.concat(", ")
          } 
          else {
          desc = desc.concat(" e ")
          }
        }
        desc = desc.concat("Intervención ");
        count += 1;
      }

      if(this.advSearch.adjunto_resolucion){
        if(count>0){
          desc = desc.concat(" y ")
        }
        desc = desc.concat("Resolución ");
      }
    }
    return desc;
  }

  //---------------------------------------------------------------------

  //Para actualizar Opiniones --------------------------------------------

  checkEnableOp(event){
    if(event.value == "no"){
      this.disOp = true;
    }else{
      this.disOp = false;
    }
  }

  ActualizarDescOpinion(){
    if (!this.advSearch.opinion_negative && !this.advSearch.opinion_positivo && !this.advSearch.opinion_neutro){
      this.advSearch.opinion_negative = true;
      this.advSearch.opinion_positivo = true;
      this.advSearch.opinion_neutro = true;
    }
    this.inputDescripcion = this.InputADescripcionOpinion();

    if(this.advSearch.opinion_tiene != "no"){
      this.turnOn("OpinionPanel", "OpinionFont");

      this.descripcionOpinion = this.inputDescripcion;
    }else{
      this.turnOff("OpinionPanel", "OpinionFont")
      
      this.descripcionOpinion = this.inputDescripcion;
    }
  }

  InputADescripcionOpinion(): string{
    let desc:string = "";

    if(this.advSearch.opinion_tiene == "no"){
      desc = "No se filtra por opiniones"
    }else{
      desc = desc.concat(this.advSearch.opinion_tiene + " opiniones ");
      let count = 0;
      if(this.advSearch.opinion_positivo){
        desc = desc.concat("positivas");
        count += 1;
      }

      if(this.advSearch.opinion_negative){
        if(count>0){
          if(this.advSearch.opinion_neutro){
          desc = desc.concat(", ")
          }
          else{
          desc=desc.concat(" y ")
          }
        }
        desc = desc.concat("negativas ");
        count += 1;
      }

      if(this.advSearch.opinion_neutro){
        if(count>0){
          desc = desc.concat(" y ")
        }
        desc = desc.concat("neutras ");
      }
    }
    return desc;
  }

  //---------------------------------------------------------------------

  //Para actualizar Estado --------------------------------------------

  addEstadoToChips(value:string):void{
    if(value != "" && this.estadoBuscador.panelOpen){
      if(!this.advSearch.estado_estados.includes(value)){
        this.advSearch.estado_estados.push(value);
      }
    }
    this.estadoBuscador.value = "";
  }

  removeEstado(value:string):void{
    this.advSearch.estado_estados = this.advSearch.estado_estados.filter(estado => estado!= value);
  }



  InputADescripcionEst(){
    let desc:string = "Se filtra por estado";


    return desc;
  }

  EstChanged():boolean{
    if(this.advSearch.estado_estados.length > 0 || this.advSearch.estado_detallado != ""){ 
      return true;
    }
          
    return false;
  }

  ActualizarEstado(){
    if(this.EstChanged()){
      this.turnOn("EstadoPanel", "");

      this.advSearch.estado_fecha_start = this.estado_DateRango.begin;
      this.advSearch.estado_fecha_end = this.estado_DateRango.end;

      this.descripcionEstado = this.InputADescripcionEst();
    }else{
      this.turnOff("EstadoPanel", "");
            
      this.descripcionEstado = "No se filtra por estado";
    }
  }

  //---------------------------------------------------------------------

  //Para actualizar Distrito --------------------------------------------
  onChange(searchValue: string):void{
    if(searchValue.length > 2){

      //this.filteredVecinales = this.solicitudesService.getVecinales();
      //this.filteredDistritos = this.solicitudesService.getDistritos();

      this.filteredVecinales = this.solicitud.filteredVecinalesSearch(searchValue);
      this.filteredDistritos = this.solicitud.filterdeDistritosSearch(searchValue, this.filteredVecinales);


    }else{
      this.filteredDistritos = [];
      this.filteredVecinales = [];
    }
  }

  showSelected(option: string| Vecinal){
   if(typeof option === "string"){
    this.selecDistrito(option);
   }else{
     this.selecVecinal(option);
   }
  }


  remove(vecinal: Vecinal):void{
    this.advSearch.distrito_vecinales = this.advSearch.distrito_vecinales.filter(valor => valor.nombre != vecinal.nombre);
  }

  selecVecinal( vecinal:Vecinal):void{
    if(this.advSearch.distrito_vecinales.every(value => value.nombre != vecinal.nombre)){
      this.advSearch.distrito_vecinales.push(vecinal);
    }

    this.searchElement.nativeElement.value = "";
    this.filteredDistritos = [];
    this.filteredVecinales = [];

  }

  selecDistrito(distrito: string):void{
    let temp = this.solicitud.getVecinales().filter(vecinal => vecinal.distrito == distrito);

    temp.forEach(vecinal => {
      if(this.advSearch.distrito_vecinales.every(chip => chip.nombre != vecinal.nombre)){
        this.advSearch.distrito_vecinales.push(vecinal);
      }
    });


    this.searchElement.nativeElement.value = "";
    this.filteredDistritos = [];
    this.filteredVecinales = [];

  }

  InputADescripcionDistirto(){
    let desc:string = "Se filtra por " + this.advSearch.distrito_vecinales.length + " distritos";


    return desc;
  }

  ActualizarDescDistrito(){
    this.inputDescripcion = this.InputADescripcionDistirto();

    if(this.advSearch.distrito_vecinales.length > 0){
      this.turnOn("DistritoPanel", "");

      this.descripcionDistrito = this.InputADescripcionDistirto();
    }else{
      this.turnOff("DistritoPanel", "")
      
      this.descripcionDistrito = "No se filtra por distritos";
    }
  }
  //---------------------------------------------------------------------

  //Para actualizar Intervenciones --------------------------------------
  quitarIntervencion(int:string):void{
    this.advSearch.intervenciones_seleccionadas = this.advSearch.intervenciones_seleccionadas.filter(value => value != int);

  }

  agregarInt(int: string):void{
    if(int!= "" && this.intSelect.panelOpen){
      if(this.advSearch.intervenciones_seleccionadas.every(value => value != int)){
        this.advSearch.intervenciones_seleccionadas.push(int);
      }
      
    }
    this.intSelect.value = "";
  }

  InputADescripcionInt(){
    let desc:string = "Se filtra por intervenciones";


    return desc;
  }

  intChanged():boolean{
    if(this.advSearch.intervenciones_tipo != "" || this.advSearch.intervenciones_suaMovile || this.advSearch.intervenciones_seleccionadas.length > 0){ 
      return true;
    }
          
    return false;
  }

  ActualizarDescInt(){
    this.inputDescripcion = this.InputADescripcionInt();

    if(this.intChanged()){
      this.turnOn("IntPanel", "changeFont");

      this.advSearch.intervenciones_fecha_begin = this.intervenciones_DateRango.begin;
      this.advSearch.intervenciones_fecha_end = this.intervenciones_DateRango.end;

      this.descripcionInt = this.inputDescripcion;
    }else{
      this.turnOff("IntPanel", "changeFont")
            
      this.descripcionInt = "No se filtra por intervenciones";
    }
  }

  //---------------------------------------------------------------------

  //Para actualizar Equipamiento --------------------------------------

  InputADescripcionEqp(){
    let desc:string = "Se filtra por equipamiento";


    return desc;
  }

  EqpChanged():boolean{
    //console.log(this.equipamiento_seleccionado);
    //console.log(this.equipamiento_detalle);
    //console.log(this.equipamiento_choice);
    if(this.advSearch.equipamiento_choice != "" || this.advSearch.equipamiento_detalle != "" || this.advSearch.equipamiento_seleccionado != ""){ 
      return true;
    }
          
    return false;
  }

  ActualizarDescEqp(){

    if(this.EqpChanged()){
      this.turnOn("EqpPanel", "changeFontEqp");

      this.descripcionEqp = this.InputADescripcionEqp();
    }else{
      this.turnOff("EqpPanel", "changeFontEqp")
            
      this.descripcionEqp = "No se filtra por equipamiento";
    }
  }

  //---------------------------------------------------------------------

  //Para actualizar Asignaciones --------------------------------------

  showIt(value){
    console.log(value);
  }

  updateEquipoAuto(value:string):void{
    if(value == ""){
      this.List_Personas = this.List_Personas_Total
    }else{
      this.List_Personas = this.List_Personas_Total.filter(per => per.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }
  }

  agregarEquipo(persona:string):void{
    if(!this.advSearch.asignacion_listPersonas.includes(persona)){
      this.advSearch.asignacion_listPersonas.push(persona);
    }
    this.equipoSearch.nativeElement.value = "";
  }

  removeEquipo(persona:string):void{
    this.advSearch.asignacion_listPersonas = this.advSearch.asignacion_listPersonas.filter(value => value != persona);
  }

  InputADescripcionAsig(){
    let desc:string = "Se filtra por asignación";


    return desc;
  }

  AsigChanged():boolean{
    if(this.advSearch.asignacion_tipo != "" || this.advSearch.asignacion_listPersonas.length > 0){ 
      return true;
    }
          
    return false;
  }

  ActualizarDescAsig(){
    if(this.AsigChanged()){
      this.turnOn("AsigPanel", "");

      this.advSearch.asignacion_fecha_start = this.asigDate.begin;
      this.advSearch.asignacion_fecha_end = this.asigDate.end;

      this.descripcionAsig = this.InputADescripcionAsig();
    }else{
      this.turnOff("AsigPanel", "")
            
      this.descripcionAsig = "No se filtra por asignación";
    }
  }

  //---------------------------------------------------------------------

  //Para actualizar Datos Especificos --------------------------------------


  ActualizarDescDE(){};
  //---------------------------------------------------------------------

  //funciones para cambiar visualmente los paneles expansores-------------
  turnOn(panelId:string, fontId: string){
    document.getElementById(panelId).style.animationName = "hasData"
    document.getElementById(panelId).style.webkitAnimationName = "hasData"
    document.getElementById(panelId).style.webkitAnimationDirection = "normal";
    document.getElementById(panelId).classList.remove("light");
    document.getElementById(panelId).classList.add("dark");
    if(fontId != ""){
      document.getElementById(fontId).style.color = "#ffffff";
    }
  }

  turnOff(panelId:string, fontId: string){
    if( document.getElementById(panelId).style.animationName == "hasData"){
      document.getElementById(panelId).style.animationDirection = "reverse";
      document.getElementById(panelId).style.webkitAnimationDirection = "reverse";
      document.getElementById(panelId).classList.remove("dark");
      document.getElementById(panelId).classList.add("light");
      if(fontId != ""){
        document.getElementById(fontId).style.color = "#000000";
      }
    }
  }
  //----------------------------------------------------------------------------



}
