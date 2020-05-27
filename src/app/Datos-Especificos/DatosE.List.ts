import {PermisoDePoda} from './DatosE-Componentes/PermisoDePoda.Component'
import {DatoEspecifico} from './DatoI.Component'
import { Component } from '@angular/core';
import { DemasiadosSubtipos } from './DatosE-Componentes/demasiadosSubtipos.Component';
import { InseguridadObraConst } from './DatosE-Componentes/InseguridadObraConst.Component';
import { TableroAbiertoODañado } from './DatosE-Componentes/TableroAbiertoODañado.Component';

export class DatosEList{
    static getDatoEspecifico(nombre:string): any{
        switch(nombre){
            case 'Permiso de poda ó extracción por cuenta propia':{
                return PermisoDePoda;
                break;
            }
            case 'Inseguridad por obra en construcción':{
                return InseguridadObraConst;
                break;
            }
            case 'Tablero abierto ó dañado':{
                return TableroAbiertoODañado;
                break;
            }
            default:{
                console.log("error no deberia haber entrado");
                return DemasiadosSubtipos;
                break;
            }
        }
    }
}