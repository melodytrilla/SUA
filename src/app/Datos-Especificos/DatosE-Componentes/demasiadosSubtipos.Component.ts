import { Component, Input }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';

@Component({
  template: `
            <div style="display: flex; align-items:center; justify-content:center">
              <p>Para poder ingresar Datos Especificos tiene que tener solo un subtipos</p>
            </div>
            `

})
export class DemasiadosSubtipos implements DatoEspecifico {
  @Input() datos: any;
}