import { Input } from '@angular/core';
import { DatoEspecifico } from './DatoI.Component';

export class DatoEBase{
    //son los datos pasados para el componente
    //el tipoDE es para guardar cual de las clases guardo
    //el contenido son todos los datos guardados que se veran en el buscador
    @Input() datos:{tipoDE: string, contenido: any};

    //devuelve los datos para que puedan ser guardados en el componente padre
    public getDatos():any{
        return this.datos;
    }

    //informa si el componente esta en el estado base o si se cambio
    public hasChanged():boolean{
        return false;
    }

    //devuelve el estado base de este componente
    public defaultState():any{
        return {tipoDE: "", contenido: {}};
    }

    //devuelve el resumen de descripcion que tiene este componente
    public getDescription():string{
        return "";
    }
}