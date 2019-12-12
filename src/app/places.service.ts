import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  places = ['Francia', 'Pellegrini', 'Mendoza', 'San Juan', 'Oroño', 'Alaska', 'Montevideo'];
  
  constructor() { }
  
  getPlaces (): String[] {
    return this.places
  }

}
