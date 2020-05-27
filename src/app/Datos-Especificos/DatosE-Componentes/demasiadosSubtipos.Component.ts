import { Component, Input }  from '@angular/core';

import { DatoEspecifico }       from '../DatoI.component';
import { DatoEBase } from '../DatoEBase.Component';

@Component({
  template: `
            <div style="display: flex; align-items:center; justify-content:center">
              <p>Para poder ingresar Datos Especificos tiene que tener solo un subtipos</p>
            </div>
            `

})
export class DemasiadosSubtipos extends DatoEBase implements DatoEspecifico {

  public getDatos():any{
    return null;
  }

}