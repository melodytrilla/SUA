import { Component, Input }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';

@Component({
  template: `
            <p>Tipo de pedido:</p>
            <mat-radio-group [(ngModel)] = "datos.pedido">
                <mat-radio-button class="texto-regular" value="Poda" color="primary"> Poda </mat-radio-button>
                <mat-radio-button class="texto-regular" value="Extraccion" color="primary"> Extraccion </mat-radio-button>
                <mat-radio-button class="texto-regular" value="" color="primary"> No seleccionado </mat-radio-button>
            </mat-radio-group>
            `
})
export class PermisoDePoda implements DatoEspecifico {
  @Input() datos: any;
}