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
 
  equipamiento_tipo:string[] = ["Alumbrado-columna", "Camara-bicis publicas", "Semaforo-semaforo"];
  equipamiento_seleccionado:string = "";

  equipamiento_choice:string = "";

  equipamiento_detalle:string = "";

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
