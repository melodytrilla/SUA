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


  reiteraciones: string = "ambas";
  tipos_reiteraciones: string[] = ["ambas", "con", "sin"];

  opt_selected;

  ngOnInit() {
      this.ActualizarDesc()

  }
  ActualizarDesc(){
    this.inputDescripcion = this.InputADescripcion();

    if(!(this.reiteraciones == "ambas" && this.opt_selected == undefined)){
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

    //reiteraciones
    if(this.reiteraciones == "ambas"){
      desc = desc.concat("con o sin reiteraciones. ");
      
    }else{
      desc = desc.concat(this.reiteraciones + " reiteraciones. ");
    }

    if(this.opt_selected != undefined){
      desc = desc.concat( "prioriedad " + this.opt_selected);
    }else{
      desc = desc.concat("cualquier prioriedad");
    }

    return desc;
  }
}
