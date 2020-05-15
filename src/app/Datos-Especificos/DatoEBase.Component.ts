import { Input } from '@angular/core';
import { DatoEspecifico } from './DatoI.Component';

export class DatoEBase{
    @Input() datos:{tipoDE: string, contenido: any};

    public getDatos():any{
        return this.datos;
    }

    public hasChanged():boolean{
        return false;
    }

    public hasChangeddata( dato:DatoEspecifico):boolean{
        return false;
    }

    public defaultState(){}
}