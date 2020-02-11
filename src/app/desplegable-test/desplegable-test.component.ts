import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatExpansionPanel } from '@angular/material';
import { SolicitudesService, Vecinal } from '../solicitudes.service';
import { SatDatepickerRangeValue } from 'saturn-datepicker';


@Component({
  selector: 'app-desplegable-test',
  templateUrl: './desplegable-test.component.html',
  styleUrls: ['./desplegable-test.component.sass']
})



export class DesplegableTestComponent implements OnInit {

  areas:string[] = [];

  readonly default_descripcion: string = "esto es un descripcion temporal";

  constructor(private solicitudesService: SolicitudesService) { }

  public descripcion: string = this.default_descripcion;
  inputDescripcion="";

  

  //----------------------------------------------------
  estados_total:string[] = ["Resuelto", "Cerrado", "En curso", "Pendiente", "Archivado de oficio"];
  estados_select:string[] = [];

  detallados_total:string[] = ["Derivado", "Resuelto con aviso", "Resuelto", "Resuelto sin aviso", "Archivado de oficion", "Rechazado", "Pendiente", "Cerrado"];
  detallados_select:string = "";

  estado_DateRango: SatDatepickerRangeValue<Date> = {begin: null, end: null};

  addEstadoToChips(value:string):void{
    if(!this.estados_select.includes(value)){
      this.estados_select.push(value);
    }
  }

  removeEstado(value:string):void{
    this.estados_select = this.estados_select.filter(estado => estado!= value);
  }



  ngOnInit() {
    //this.solicitudesService.getAllVecinales();
    this.ActualizarDesc()

  }
  ActualizarDesc(){
    this.inputDescripcion = this.InputADescripcion();

    if(this.inputDescripcion == ""){
      document.getElementById("principalPanel").style.animationName = "hasData"
      document.getElementById("principalPanel").style.webkitAnimationName = "hasData"
      document.getElementById("principalPanel").style.animationDirection = "normal";
      document.getElementById("principalPanel").style.webkitAnimationDirection = "normal";

      this.descripcion = this.inputDescripcion;
    }else{
      if( document.getElementById("principalPanel").style.animationName == "hasData"){
        document.getElementById("principalPanel").style.animationDirection = "reverse";
        document.getElementById("principalPanel").style.webkitAnimationDirection = "reverse";
      }
      this.descripcion = "no se busca por esta categoria.";
    }
  }

  InputADescripcion(): string{
    let desc:string = "se filtra por  distritos";


    return desc;
  }

  
/*
  updateAutocomplete(value: string):void{
    this.areas = [];
    this.solicitudesService.getAreas().subscribe(result => 
      this.areas = result.filter((area) => {
      return (area.toLowerCase()).includes(value);
    }))
  }*/
}
