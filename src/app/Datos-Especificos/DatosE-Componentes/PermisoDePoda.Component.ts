import { Component, Input, OnInit }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';

@Component({
  template: `
            <div style="display: flex; align-items:center; justify-content:center">
              <p>Tipo de pedido:</p>
              <mat-radio-group [(ngModel)] = "datos.pedido" style="display: flex;">
                <mat-radio-button class="texto-regular" value="Poda" color="primary" style="margin-left: 5%"> Poda </mat-radio-button>
                <mat-radio-button class="texto-regular" value="Extraccion" color="primary" style="margin-left: 5%"> Extraccion </mat-radio-button>
                <mat-radio-button class="texto-regular" value="" color="primary" style="margin-left: 5%"> No seleccionado </mat-radio-button>
              </mat-radio-group>
            </div>
            `
})
export class PermisoDePoda implements DatoEspecifico, OnInit {
  @Input() datos: any;

  ngOnInit(): void {
    //verifica si existe un dato de pedidos si no lo hace vacio
    if(this.datos.pedido == undefined){
      this.datos.pedido = "";
    }
    
    // -- asi es como se borra todo
    //this.datos = [];
    
  }
}