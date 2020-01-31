import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-desplegable-test',
  templateUrl: './desplegable-test.component.html',
  styleUrls: ['./desplegable-test.component.sass']
})



export class DesplegableTestComponent implements OnInit {

  readonly default_descripcion: string = "esto es un descripcion temporal";

  constructor() { }

  public descripcion: string = this.default_descripcion;
  inputDescripcion="";

  tipos :string[]= ["Emergencia", "Suceso", "Reclamo", "Consulta", "Sugerencia", "Denuncia", "Tramite"]
  tipo:string;

  registroCheck;
  reiteracionCheck;

  origenes:string[] = ["Telefonico", "Personal", "Facebook", "Twitter", "Contacto Web", "Nota/Expediente", "VVV", "MR", "Externo", "MR Movil", "Sensor", "Vecino Movil"]
  origenesSeleccionados:string[] = [];


  ngOnInit() {
      this.ActualizarDesc()

  }
  ActualizarDesc(){
    this.inputDescripcion = this.InputADescripcion();

    if(this.inputDescripcion!=""){
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
      this.descripcion = this.inputDescripcion;
    }
  }

  InputADescripcion(): string{
    let desc:string = "";


    return desc;
  }

  agregarChipOrigen(origen:string):void{
    if(this.origenesSeleccionados.length == 0){
      this.origenesSeleccionados = this.origenesSeleccionados.concat(origen);
    }else{
      if(!this.origenesSeleccionados.includes(origen)){
        this.origenesSeleccionados = this.origenesSeleccionados.concat(origen);
      }  
    }
    //console.log(this.origenesSeleccionados);
  } 

  takeOut(elegido:string):void{
    this.origenesSeleccionados = this.origenesSeleccionados.filter((elem) => {return elem != elegido});
    //console.log(this.origenesSeleccionados);
  }
}
