import { Injectable } from '@angular/core';
import { AdvSearch } from './filtro-avanzado-dialog/filtro-avanzado-dialog.component';

export interface Busqueda{
  dateRange_begin: Date,
  dateRange_end: Date,
  Id_solicitud: string,
  año: number,
  Dir: any,
  radio: number,
  Id_solicitante: string,
  advSearch: AdvSearch
}


@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor() { }

  busquedaCompleta:Busqueda ={
    dateRange_begin: null,
    dateRange_end: null,
    Id_solicitud: "",
    año: null,
    Dir: null,
    radio: 0,
    Id_solicitante: "",
    advSearch: null,

  };

}
