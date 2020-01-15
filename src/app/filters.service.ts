import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chip } from './chips-container/chips-container.component';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  apiURL = "http://localhost:3000"
  otherURL = "http://localhost:4000"
  constructor(private httpClient: HttpClient) { }

  //Obtiene los datos del banner del dashboard
  getNewFilters(searchValue: string): Observable<Chip[]>{
    return this.httpClient.get<Chip[]>(
      `${this.otherURL}/Categorias?main=${searchValue}`
    );
  }
}
