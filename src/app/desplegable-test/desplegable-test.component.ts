import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';
import { SolicitudesService } from '../solicitudes.service';


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

  tipos :string[]= ["Emergencia", "Suceso", "Reclamo", "Consulta", "Sugerencia", "Denuncia", "Tramite"]
  tipo:string;

  registroCheck;
  reiteracionCheck;

  origenes:string[] = ["Telefonico", "Personal", "Facebook", "Twitter", "Contacto Web", "Nota/Expediente", "VVV", "MR", "Externo", "MR Movil", "Sensor", "Vecino Movil"]
  origenesSeleccionados:string[] = [];

  //----------------------------------------------------
  origen:string = "";
  destino:string = "";
  reiteracion:string="";

  //-------------------------------------------------------
  dis: boolean= true;
  tiene: string = "no";
  registro: boolean = false;
  intervencion: boolean = false;
  resolucion: boolean = false;

  checkEnable(event){
    if(event.value == "no"){
      this.dis = true;
    }else{
      this.dis = false;
    }
  }


  ngOnInit() {
      this.ActualizarDesc()

  }
  ActualizarDesc(){
    this.inputDescripcion = this.InputADescripcion();

    if(this.tiene != "no"){
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

    if(this.tiene == "no"){
      desc = "no tiene adjuntos."
    }else{
      desc = desc.concat(this.tiene + "adjuntos en ");
      let count = 0;
      if(this.registro){
        desc = desc.concat("Registro/ Reiteracion ");
        count += 1;
      }

      if(this.intervencion){
        if(count>0){
          desc = desc.concat("y ")
        }
        desc = desc.concat("Intervencion ");
      }

      if(this.resolucion){
        if(count>0){
          desc = desc.concat("y ")
        }
        desc = desc.concat("Resolucion ");
      }
    }


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
