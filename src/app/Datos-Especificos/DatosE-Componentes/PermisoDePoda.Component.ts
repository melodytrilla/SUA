import { Component, Input, OnInit }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';
import { DatoEBase } from '../DatoEBase.Component';

@Component({
  template: `
            <div style="display: flex; align-items:center; justify-content:center">
              <p>Tipo de pedido:</p>
              <mat-radio-group [(ngModel)] = "datos.contenido.pedido" style="display: flex;">
                <mat-radio-button class="texto-regular" value="Poda" color="primary" style="margin-left: 5%"> Poda </mat-radio-button>
                <mat-radio-button class="texto-regular" value="Extraccion" color="primary" style="margin-left: 5%"> Extraccion </mat-radio-button>
                <mat-radio-button class="texto-regular" value="" color="primary" style="margin-left: 5%"> No seleccionado </mat-radio-button>
              </mat-radio-group>
            </div>
            `
})

//
export class PermisoDePoda extends DatoEBase implements DatoEspecifico, OnInit {

  ngOnInit(): void {
    //console.log(this.datos);
    if(this.datos == undefined){
      this.datos = {tipoDE: "PermisoDePoda", contenido: {pedido: ""}};
    }

    if(this.datos.tipoDE == "PermisoDePoda"){
      //verifica si existe un dato de pedidos si no lo hace vacio
      //este caso deberia ser inposible pero prefiero estar seguro antes de que se ropa el programa
      
      if(this.datos.contenido.pedido == undefined){
        this.datos.contenido.pedido = "";

      }
    }else{
      //si no es de pedido de poda lo cambia y borra datos anteriores remplazandolos por poedido
     
      this.datos.tipoDE = "PermisoDePoda";
      this.datos.contenido = {pedido: ""};
    }
    // -- asi es como se borra todo
    //this.datos = [];
    
  }

  public hasChanged():boolean{
    return this.datos.contenido.pedido != "";
  }

  public defaultState():any{
    return {tipoDE: "PermisoDePoda", contenido: {pedido: ""}};
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