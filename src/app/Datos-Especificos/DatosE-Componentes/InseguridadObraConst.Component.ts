import { Component, Input, OnInit }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';
import { DatoEBase } from '../DatoEBase.Component';

@Component({
  template: `
            <div>
                <div>
                    <p>Cartel:</p>
                    <mat-radio-group [(ngModel)] = "datos.contenido.cartel" style="display: flex;">
                        <mat-radio-button class="texto-regular" value="Si" color="primary" style="margin-left: 5%"> Si </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="No" color="primary" style="margin-left: 5%"> No </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="" color="primary" style="margin-left: 5%"> No asignado </mat-radio-button>
                    </mat-radio-group>
                </div>
                <div>
                    <p>Tipo cartel:</p>
                    <mat-radio-group [(ngModel)] = "datos.contenido.tipo_cartel" style="display: flex;">
                        <mat-radio-button class="texto-regular" value="Demolicion" color="primary" style="margin-left: 5%"> Demolicion </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="Edificacion" color="primary" style="margin-left: 5%"> Edificacion </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="Aviso de Obra" color="primary" style="margin-left: 5%"> Aviso de obra </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="" color="primary" style="margin-left: 5%"> No asignado </mat-radio-button>
                    </mat-radio-group>
                </div>
                <br>
                <div style="display: flex">
                    <div >
                        <mat-form-field>
                            <mat-label>Nro. permiso</mat-label>
                            <input matInput [(ngModel)] = "datos.contenido.nro_permiso">
                        </mat-form-field>
                    </div>
                    <div style="margin-left:25%; width: 50%">
                        <mat-form-field style="width:100%">
                            <mat-label>Nombre y apellido del atendiente</mat-label>
                            <input matInput [(ngModel)] = "datos.contenido.atendiente_NombreApellido">
                        </mat-form-field>
                    </div>
                </div>
                <div >
                    <mat-form-field>
                        <mat-label>Relevamiento en la obra</mat-label>
                        <input matInput [(ngModel)] = "datos.contenido.relevamiento">
                    </mat-form-field>
                </div>
            </div>
            `
})

export class InseguridadObraConst extends DatoEBase implements OnInit {

  ngOnInit(): void {

    if(this.datos == undefined){
      this.datos = this.defaultState();
    }

    if(this.datos.tipoDE == "InseguridadObraConst"){
      //verifica si existe un dato de pedidos si no lo hace vacio
      //este caso deberia ser inposible pero prefiero estar seguro antes de que se ropa el programa
      
      if(this.datos.contenido.pedido == undefined){
        this.datos.contenido.cartel = "";
        this.datos.contenido.tipo_cartel = "";
        this.datos.contenido.nro_permiso = "";
        this.datos.contenido.atendiente_NombreApellido = "";
        this.datos.contenido.relevamiento = "";
      }
    }else{
      //si no es de pedido de poda lo cambia y borra datos anteriores remplazandolos por poedido
     
      this.datos.tipoDE = "InseguridadObraConst";
      this.datos.contenido = {cartel: "", tipo_cartel: "", nro_permiso: "", atendiente_NombreApellido: "", relevamiento: ""};
    }    
  }

  public hasChanged():boolean{
    return this.datos.contenido.cartel != "" ||
    this.datos.contenido.tipo_cartel != "" ||
    this.datos.contenido.nro_permiso != ""||
    this.datos.contenido.atendiente_NombreApellido != ""||
    this.datos.contenido.relevamiento != "";
  }

  public defaultState():any{
    this.datos = {tipoDE: "InseguridadObraConst", contenido: {cartel: "", tipo_cartel: "", nro_permiso: "", atendiente_NombreApellido: "", relevamiento: ""}};
    return this.datos;
  }

  public getDescription():string{
    if(this.datos.contenido.pedido != ""){
      return "El tipo de pedido es de " + this.datos.contenido.pedido;
    }
    else{
      return "No se filtra por tipo de pedido";
    }
  }
}