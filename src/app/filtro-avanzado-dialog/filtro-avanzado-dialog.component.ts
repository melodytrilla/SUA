import { Component, OnInit, Inject, Input, ViewChild, ElementRef, ContentChild, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioGroup, MatSelect } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {DateRangePicker} from '../date-range-picker/date-range-picker.component';

import { Chip, ChipsContainerComponent } from '../chips-container/chips-container.component';
import { BusquedaService } from '../busqueda.service';
import { SolicitudesService, Vecinal } from '../solicitudes.service';
import { SatDatepickerRangeValue } from 'saturn-datepicker';


export interface AdvSearch{
  filtros: Chip[];
  Originadas_dirTransito: boolean;
  con_Intervenciones: string;
  intervenciones_fechaStart: Date;
  intervenciones_fechaEnd: Date;
}


@Component({
  selector: 'app-filtro-avanzado-dialog',
  templateUrl: './filtro-avanzado-dialog.component.html',
  styleUrls: ['./filtro-avanzado-dialog.component.sass']
})
export class FiltroAvanzadoDialogComponent implements OnInit{

  //una variable donde se guardaran todos los valores y asociaran algunos valores de la forma
  advSearch: AdvSearch = {
    filtros: [],
    Originadas_dirTransito: false,
    con_Intervenciones: "",
    intervenciones_fechaStart: null,
    intervenciones_fechaEnd: null
  };

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

  tipo_con:boolean = true;
  tipo_sin: boolean = true;

  opt_selected;

  //--------------------------------------------------------------------

  //-----Busqueda Clasificacion ----------------------------------------
  @ViewChild('origenSelect', {static: false}) origenSelect: MatSelect;
  
  public descripcionCalif:string = this.default_descripcion; 

  tipos :string[]= ["Emergencia", "Suceso", "Reclamo", "Consulta", "Sugerencia", "Denuncia", "Trámite"]
  tipo:string;

  registroCheck = true;
  reiteracionCheck = true;

  origenes:string[] = ["Telefónico", "Personal", "Facebook", "Twitter", "Contacto Web", "Nota/Expediente", "VVV", "MR", "Externo", "MR Móvil", "Sensor", "Vecino Móvil"]
  origenesSeleccionados:string[] = [];


  //--------------------------------------------------------------------
  
  //-----Busqueda Area -------------------------------------------------
  public descripcionArea:string = this.default_descripcion; 
  area_areas:string[] = [];

  area_origen:string = undefined;
  area_destino:string = undefined;
  area_reiteracion:string= undefined;
  //--------------------------------------------------------------------
  
  //-----Busqueda Adjunto ----------------------------------------------
  public descripcionAdjunto: string;
  
  dis: boolean= true;
  tiene: string = "no";
  registro: boolean = false;
  intervencion: boolean = false;
  resolucion: boolean = false;

  //-----Busqueda Opinion ----------------------------------------------
  public descripcionOpinion: string;
  
  disOp: boolean= true;
  tieneOp: string = "no";
  positivo : boolean = false;
  negativo: boolean = false;
  neutro: boolean = false;

  //--------------------------------------------------------------------

  //-----Busqueda Estado ----------------------------------------------
  @ViewChild('estadoBuscador', {static: false}) estadoBuscador:MatSelect;

  descripcionEstado:string = "";

  estados_total:string[] = ["Resuelto", "Cerrado", "En curso", "Pendiente", "Archivado de oficio"];
  estados_select:string[] = [];

  detallados_total:string[] = ["Derivado", "Resuelto con aviso", "Resuelto", "Resuelto sin aviso", "Archivado de oficion", "Rechazado", "Pendiente", "Cerrado"];
  detallados_select:string = "";

  estado_DateRango: SatDatepickerRangeValue<Date> = {begin: null, end: null};

  //--------------------------------------------------------------------

  //-----Busqueda Distrito ----------------------------------------------
  @ViewChild('search', {static: false}) searchElement: ElementRef;

  descripcionDistrito:string = "";

  filteredDistritos: string[] = [];
  filteredVecinales: Vecinal[] = [];

  chipVecinales: Vecinal[] = [];

  separatorKeys: number[] = [ENTER, COMMA];

  
  //--------------------------------------------------------------------

  //-----Busqueda Intervenciones ---------------------------------------
  @ViewChild('intervencionSelect', {static: false}) intSelect: MatSelect;
  
  intervenciones:string[] = ["Acta de Informacion", "Constatado", "No constatado"];
  intervencionesSelecionadas:string[] = [];


  suaMovil:boolean = false;
  
  descripcionInt:string;

  tipoInt:string = "";

  //--------------------------------------------------------------------

  //-----Busqueda Equipamiento -----------------------------------------

  equipamiento_tipo:string[] = ["Alumbrado-columna", "Cámara-bicis públicas", "Semáforo-semáforo"];
  equipamiento_seleccionado:string = "";

  equipamiento_choice:string = "";

  equipamiento_detalle:string = "";

  descripcionEqp:string = "";

  //--------------------------------------------------------------------

  //-----Busqueda Asignacion -----------------------------------------
  @ViewChild('equipoSearch', {static: false}) equipoSearch:ElementRef;

  descripcionAsig:string = "";

  List_Personas_Total: string[] = ["Ayelen Carbone", "D'Arrigo Florencia", "Fede Movil"];
  List_Personas: string[] = [];

  List_chips_Personas: string[] = [];

  asignacion_choice:string = "";

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
      this.advSearch =  this.busqueda.busquedaCompleta.advSearch;
      
      this.datesControl.setValue({begin: this.advSearch.intervenciones_fechaStart,
                                end: this.advSearch.intervenciones_fechaEnd});
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

  // cierra la ventana al apretar cancelar
  onNoClick(): void {
    //console.log(this.form);
    this.dialogRef.close();
  }

  //agarra todos los valores puestos en el formulario y se los pasa con
  //los de la busqueda principal al servicio de busqueda
  BusquedaClick():void{
    this.advSearch.filtros = this.myChips.guardarChips();
    //console.log(this.datesControl.value);

    this.advSearch.intervenciones_fechaStart = this.datesControl.value.begin;
    this.advSearch.intervenciones_fechaEnd = this.datesControl.value.end;

    //console.log(this.advSearch);
    this.data.busqueda.advSearch = this.advSearch;
    //console.log(this.data);
    this.busqueda.Buscar(this.data.busqueda);
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
    if(!this.tipo_con && !this.tipo_sin){
      this.tipo_con = true;
      this.tipo_sin = true;
    }
    this.inputDescripcion = this.InputADescripcionReporte();

    if(!(this.tipo_con && this.tipo_sin && this.opt_selected == undefined)){
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
    if(this.tipo_con && this.tipo_sin){
      desc = desc.concat("No se filtra por reiteraciones ");
      
    }else{
      if(this.tipo_sin){
        desc = desc.concat("Sin reiteraciones ");
      }else{
        desc = desc.concat("Con reiteraciones ");
      }
    }

    if(this.opt_selected != undefined){
      desc = desc.concat( "| Prioridad: " + this.opt_selected);
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
      if(!this.origenesSeleccionados.includes(origen)){
        this.origenesSeleccionados.push(origen);
      }
      console.log(this.origenesSeleccionados);
    }
    this.origenSelect.value = "";
  } 

  takeOut(elegido:string):void{
    this.origenesSeleccionados = this.origenesSeleccionados.filter((elem) => {return elem != elegido});
    //console.log(this.origenesSeleccionados);
  }

  ActualizarDescCalificacion(){
    if(!this.registroCheck && !this.reiteracionCheck){
      this.reiteracionCheck = true;
      this.registroCheck = true;
    }
    this.inputDescripcion = this.InputADescripcionCalificacion();

    if(this.CalificacionCheck()){
      this.turnOn("CalifPanel", "CalifFont");

      this.descripcionCalif = this.inputDescripcion;
    }else{
      this.turnOff("CalifPanel", "CalifFont")
      
      this.descripcionCalif = this.inputDescripcion;
    }
  }

  CalificacionCheck():boolean{
    if(this.myChips != undefined){
      if(this.myChips.chipsLength() > 0){
        return true;
      }
    }
    if(this.tipo != undefined || this.origenesSeleccionados.length > 0){
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
    if(this.tipo != undefined){
      desc = desc.concat( "Tipo: " + this.tipo + " ");
    }else{
      desc = desc.concat("Cualquier tipo ");
    }
    if(this.origenesSeleccionados.length > 0){
      if(this.registroCheck===false && this.reiteracionCheck===false){
        desc = desc.concat("| Origen: " + this.origenesSeleccionados[0] + " ");
        }
      if (this.registroCheck===true && this.reiteracionCheck===false ){
          desc = desc.concat("| Origen de registro: " + this.origenesSeleccionados[0] + " ");
          }
      if(this.reiteracionCheck===true && this.registroCheck===false ){
        desc = desc.concat("| Origen de reiteración: " + this.origenesSeleccionados[0] + " ");
          }
      if(this.reiteracionCheck===true && this.registroCheck===true ){
        desc = desc.concat("| Origen de registro y reiteración: " + this.origenesSeleccionados[0] + " ");
          }
      if(this.origenesSeleccionados.length > 1){
        desc = desc.concat("+" + (this.origenesSeleccionados.length - 1));
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

    if(this.area_origen){
      desc = desc.concat("Origen: " + this.area_origen);
      //cantDesc += 1;
    }


    if(this.area_destino){
      /*if(cantDesc > 0){
        desc = desc.concat(", ");
      }*/
      desc = desc.concat("| Destino: " + this.area_destino);
    }


    if(this.area_reiteracion){
      /*if(cantDesc > 0){
        desc = desc.concat(", ");
      }*/
      desc = desc.concat("| Reiteración: " + this.area_reiteracion);
    }
    return desc;
  }

  AreaCheck():boolean{
    if(this.area_origen  || this.area_destino || this.area_reiteracion){
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
    if(this.tiene!= "no" && !this.registro && !this.intervencion && !this.resolucion){
      this.registro = true;
      this.intervencion = true;
      this.resolucion = true;
    }
    this.inputDescripcion = this.InputADescripcionAdjunto();

    if(this.tiene != "no"){
      this.turnOn("AdjuntoPanel", "AdjuntoFont");

      this.descripcionAdjunto = this.inputDescripcion;
    }else{
      this.turnOff("AdjuntoPanel", "AdjuntoFont")
      
      this.descripcionAdjunto = this.inputDescripcion;
    }
  }

  InputADescripcionAdjunto(): string{
    let desc:string = "";

    if(this.tiene == "no"){
      desc = "No se filtra por adjuntos"
    }else{
      desc = desc.concat(this.tiene + " adjuntos en ");
      let count = 0;
      if(this.registro){
        desc = desc.concat("Registro/Reiteración");
        count += 1;
      }

      if(this.intervencion){
        if(count>0){
          if (this.resolucion){
          desc = desc.concat(", ")
          } 
          else {
          desc = desc.concat(" e ")
          }
        }
        desc = desc.concat("Intervención ");
        count += 1;
      }

      if(this.resolucion){
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
    if (!this.negativo && !this.positivo && !this.neutro){
      this.negativo = true;
      this.positivo = true;
      this.neutro = true;
    }
    this.inputDescripcion = this.InputADescripcionOpinion();

    if(this.tieneOp != "no"){
      this.turnOn("OpinionPanel", "OpinionFont");

      this.descripcionOpinion = this.inputDescripcion;
    }else{
      this.turnOff("OpinionPanel", "OpinionFont")
      
      this.descripcionOpinion = this.inputDescripcion;
    }
  }

  InputADescripcionOpinion(): string{
    let desc:string = "";

    if(this.tieneOp == "no"){
      desc = "No se filtra por opiniones"
    }else{
      desc = desc.concat(this.tieneOp + " opiniones ");
      let count = 0;
      if(this.positivo){
        desc = desc.concat("positivas");
        count += 1;
      }

      if(this.negativo){
        if(count>0){
          if(this.neutro){
          desc = desc.concat(", ")
          }
          else{
          desc=desc.concat(" y ")
          }
        }
        desc = desc.concat("negativas ");
        count += 1;
      }

      if(this.neutro){
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
      if(!this.estados_select.includes(value)){
        this.estados_select.push(value);
      }
    }
    this.estadoBuscador.value = "";
  }

  removeEstado(value:string):void{
    this.estados_select = this.estados_select.filter(estado => estado!= value);
  }



  InputADescripcionEst(){
    let desc:string = "Se filtra por estado";


    return desc;
  }

  EstChanged():boolean{
    if(this.estados_select.length > 0 || this.detallados_select != ""){ 
      return true;
    }
          
    return false;
  }

  ActualizarEstado(){
    if(this.EstChanged()){
      this.turnOn("EstadoPanel", "");

      this.descripcionEstado = this.InputADescripcionEst();
    }else{
      this.turnOff("EstadoPanel", "")
            
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
    this.chipVecinales = this.chipVecinales.filter(valor => valor.nombre != vecinal.nombre);
  }

  selecVecinal( vecinal:Vecinal):void{
    if(this.chipVecinales.every(value => value.nombre != vecinal.nombre)){
      this.chipVecinales.push(vecinal);
    }

    this.searchElement.nativeElement.value = "";
    this.filteredDistritos = [];
    this.filteredVecinales = [];

  }

  selecDistrito(distrito: string):void{
    let temp = this.solicitud.getVecinales().filter(vecinal => vecinal.distrito == distrito);

    temp.forEach(vecinal => {
      if(this.chipVecinales.every(chip => chip.nombre != vecinal.nombre)){
        this.chipVecinales.push(vecinal);
      }
    });


    this.searchElement.nativeElement.value = "";
    this.filteredDistritos = [];
    this.filteredVecinales = [];

  }

  InputADescripcionDistirto(){
    let desc:string = "Se filtra por " + this.chipVecinales.length + " distritos";


    return desc;
  }

  ActualizarDescDistrito(){
    this.inputDescripcion = this.InputADescripcionDistirto();

    if(this.chipVecinales.length > 0){
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
    this.intervencionesSelecionadas = this.intervencionesSelecionadas.filter(value => value != int);

  }

  agregarInt(int: string):void{
    if(int!= "" && this.intSelect.panelOpen){
      if(this.intervencionesSelecionadas.every(value => value != int)){
        this.intervencionesSelecionadas.push(int);
      }
      
    }
    this.intSelect.value = "";
  }

  InputADescripcionInt(){
    let desc:string = "Se filtra por intervenciones";


    return desc;
  }

  intChanged():boolean{
    if(this.tipoInt != "" || this.suaMovil || this.intervencionesSelecionadas.length > 0){ 
      return true;
    }
          
    return false;
  }

  ActualizarDescInt(){
    this.inputDescripcion = this.InputADescripcionInt();

    if(this.intChanged()){
      this.turnOn("IntPanel", "changeFont");

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
    if(this.equipamiento_choice != "" || this.equipamiento_detalle != "" || this.equipamiento_seleccionado != ""){ 
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
    if(!this.List_chips_Personas.includes(persona)){
      this.List_chips_Personas.push(persona);
    }
    this.equipoSearch.nativeElement.value = "";
  }

  removeEquipo(persona:string):void{
    this.List_chips_Personas = this.List_chips_Personas.filter(value => value != persona);
  }

  InputADescripcionAsig(){
    let desc:string = "Se filtra por asignación";


    return desc;
  }

  AsigChanged():boolean{
    if(this.asignacion_choice != "" || this.List_chips_Personas.length > 0){ 
      return true;
    }
          
    return false;
  }

  ActualizarDescAsig(){
    if(this.AsigChanged()){
      this.turnOn("AsigPanel", "");

      this.descripcionAsig = this.InputADescripcionAsig();
    }else{
      this.turnOff("AsigPanel", "")
            
      this.descripcionAsig = "No se filtra por asignación";
    }
  }

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
