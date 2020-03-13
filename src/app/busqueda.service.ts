import { Injectable} from '@angular/core';
import { AdvSearch } from './filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { BehaviorSubject } from 'rxjs';

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
  private message = new BehaviorSubject<number>(0);

  public customMessage = this.message.asObservable();

  constructor() { }
  busquedaCompleta:Busqueda;

  //si hay algo guardado en la session se carga en una variable, si no se inicializa vacio
  Init(){
    if(window.sessionStorage['busqueda']){
      this.busquedaCompleta = JSON.parse(window.sessionStorage['busqueda']);
    }else{
      this.busquedaCompleta = {
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
  }

// se utilizara para inicializar la busqueda, por ahora solo guarda la busqueda en la session
  Buscar(busqueda: Busqueda): void{
    console.log("se esta haciendo la busqueda");
    //console.log(busqueda);
    //console.log(this.busquedaCompleta);

    //almacena la busqueda en la session
    window.sessionStorage['busqueda'] = JSON.stringify(this.busquedaCompleta);
  }

  public changeMessage(msg: number): void {
    this.message.next(msg);
  }
}
