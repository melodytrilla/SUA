import { Component, Input, OnInit }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';
import { DatoEBase } from '../DatoEBase.Component';

@Component({
  template: `
            <div>
                <p style="font-size:larger">Rcepcion de la solicitud</p>
                <div style="margin-left:5%">
                    <mat-form-field style="width:100%">
                        <mat-label>Fecha y hora en que vio el problema: </mat-label>
                        <input matInput [(ngModel)] = "datos.contenido.fechaYHora">
                    </mat-form-field>
                </div>
                <div style="margin-left:5%">
                    <p>Tipo de problema:</p>
                    <mat-radio-group [(ngModel)] = "datos.contenido.tipoProblema" style="display: flex;">
                        <mat-radio-button class="texto-regular" value="Tablero abierto" color="primary" style="margin-left: 5%"> Tablero abierto </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="Tapa rota" color="primary" style="margin-left: 5%"> Tapa de tableto rota o faltante </mat-radio-button>
                        <mat-radio-button class="texto-regular" value="" color="primary" style="margin-left: 5%"> No asignado </mat-radio-button>
                    </mat-radio-group>
                </div>
                
                <p style="font-size:larger">Gestion de la solicitud</p>
                <div style="margin-left:5%">
                    <mat-form-field style="width:50%">
                        <mat-label>Relevamiento en la obra</mat-label>
                        <mat-select [(ngModel)]="datos.contenido.relevamiento">
                            <mat-option value=""></mat-option>
                            <mat-option *ngFor="let op of ops" [value]="op.value">
                                {{op.displayValue}}
                            </mat-option>
                        </mat-select>
                    </mat-form-field>
                </div>
            </div>
            `
})

export class TableroAbiertoODañado extends DatoEBase implements OnInit {

    /*
<option value="Artefacto alineado">Artefacto alineado</option>
                            <option value="Artefacto rpuesto">Artefacto rpuesto</option>
                            <option value="Baja tencion EPE">Baja tencion EPE</option>
                            <option value="Balasto repuesto">Balasto repuesto</option>
                            <option value="Bandeja portaequipo repuesta">Bandeja portaequipo repuesta</option>
                            <option value="Brazo alineado">Brazo alineado</option>
                            <option value="Cable o alambre remplazado">Cable o alambre remplazado</option>
    */

    ops = [
        {value:"Artefacto alineado", displayValue:"Artefacto alineado"},
        {value:"Artefacto rpuesto", displayValue: "Artefacto rpuesto"},
        {value:"Baja tencion EPE",displayValue: "Baja tencion EPE"},
        {value:"Balasto repuesto", displayValue:"Balasto repuesto"},
        {value:"Bandeja portaequipo repuesta", displayValue: "Bandeja portaequipo repuesta"},
        {value:"Brazo alineado", displayValue: "Brazo alineado"},
        {value:"Cable o alambre remplazado", displayValue: "Cable o alambre remplazado"}
        //faltan mas
    ]

  ngOnInit(): void {

    if(this.datos == undefined){
      this.datos = this.defaultState();
    }

    if(this.datos.tipoDE == "TableroAbiertoODañado"){
      //verifica si existe un dato de pedidos si no lo hace vacio
      //este caso deberia ser inposible pero prefiero estar seguro antes de que se ropa el programa
      
      if(this.datos.contenido.pedido == undefined){
        this.datos.contenido.fechaYHora = "";
        this.datos.contenido.tipoProblema = "";
        this.datos.contenido.relevamiento = "";
      }
    }else{
      //si no es de pedido de poda lo cambia y borra datos anteriores remplazandolos por poedido
     
      this.datos.tipoDE = "TableroAbiertoODañado";
      this.datos.contenido = {fechaYHora: "", tipoProblema: "", relevamiento: ""};
    }    
  }

  public hasChanged():boolean{
    return this.datos.contenido.fechaYHora != "" ||
    this.datos.contenido.tipoProblema != "" ||
    this.datos.contenido.relevamiento != "";
  }

  public defaultState():any{
    this.datos = {tipoDE: "InseguridadObraConst", contenido: {fechaYHora: "", tipoProblema: "", relevamiento: ""}};
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