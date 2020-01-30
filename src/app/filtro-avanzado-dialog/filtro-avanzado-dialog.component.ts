import { Component, OnInit, Inject, Input, ViewChild, ElementRef, ContentChild, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioGroup } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import {DateRangePicker} from '../date-range-picker/date-range-picker.component';

import { Chip, ChipsContainerComponent } from '../chips-container/chips-container.component';
import { BusquedaService } from '../busqueda.service';


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
  readonly default_descripcion: string = "esto es un descripcion temporal";
  public descripcion: string = this.default_descripcion;
  inputDescripcion="";

  //Datos de busqueda ---------------------------------------------------
  //-----Buasqueda Reporte ----------------------------------------------
  reiteraciones: string;
  tipos_reiteraciones: string[] = ["ambas", "con", "sin"];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FiltroAvanzadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

    //inicializacion de los paneles expansores
    if(this.inputDescripcion != ""){
      this.ActualizarDesc()
    }
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


  //para actualizar la descripcion y color de los paneles expansores
  ActualizarDesc(){
    if(this.inputDescripcion != ""){
      document.getElementById("principalPanel").style.animationName = "hasData"
      document.getElementById("principalPanel").style.webkitAnimationName = "hasData"
      document.getElementById("principalPanel").style.webkitAnimationDirection = "normal";
      document.getElementById("principalPanel").classList.remove("light");
      document.getElementById("principalPanel").classList.add("dark");
      document.getElementById("inputField").style.color = "#ffffff";

      this.descripcion = this.inputDescripcion;
    }else{
      if( document.getElementById("principalPanel").style.animationName == "hasData"){
        document.getElementById("principalPanel").style.animationDirection = "reverse";
        document.getElementById("principalPanel").style.webkitAnimationDirection = "reverse";
        document.getElementById("principalPanel").classList.remove("dark");
        document.getElementById("principalPanel").classList.add("light");
        document.getElementById("inputField").style.color = "#000000"
      }
      this.descripcion = this.default_descripcion;
    }
  }
}
