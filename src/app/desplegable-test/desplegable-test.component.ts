import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatExpansionPanel } from '@angular/material';
import { SolicitudesService, Vecinal } from '../solicitudes.service';


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
  private _pickDate:boolean;
  disablePicker:boolean;

  get pickDate():boolean{
    return this._pickDate;
  }
  
  set pickDate(value:boolean){
    this._pickDate = value;
    this.disablePicker = !value;
  }

  intervenciones:string[] = ["Acta de Informacion", "Constatado", "No constatado"];
  intervencionesSelecionadas:string[] = [];


  suaMovil:boolean = false;

  quitarIntervencion(int:string):void{
    this.intervencionesSelecionadas = this.intervencionesSelecionadas.filter(value => value != int);

  }

  agregarInt(int: string):void{
    if(this.intervencionesSelecionadas.every(value => value != int)){
      this.intervencionesSelecionadas.push(int);
    }
  }

  ngOnInit() {
    //this.solicitudesService.getAllVecinales();
    this.ActualizarDesc()
    this.pickDate = false;

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
