import { Component, Input }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';

@Component({
  template: `
            <p>Para poder ingresar Datos Especificos tiene que tener solo un subtipos</p>
            `
})
export class DemasiadosSubtipos implements DatoEspecifico {
  @Input() datos: any;
}