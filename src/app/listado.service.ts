import { Injectable } from '@angular/core';
import { items } from './data'

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor() {}
    getItems(){
      return items;
   }
}
