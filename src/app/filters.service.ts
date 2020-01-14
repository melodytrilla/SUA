import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chip } from './chips-container/chips-container.component';
import { Chip2 } from './chips-container/chips-container.component';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  apiURL = "http://localhost:3000"
  otherURL = "http://localhost:4000"
  constructor(private httpClient: HttpClient) { }

  //Obtiene los datos del banner del dashboard
  getFilters (searchValue: string): Observable<Chip[]> {
    return this.httpClient.get<Chip[]>(
      `${this.apiURL}/filters?search=${searchValue}`);
  }

  getNewFilters(searchValue: string): Observable<String>{
    return this.httpClient.get<String>(
      `${this.otherURL}/Categorias?main=${searchValue}`
    );
  }

  getNewFilters2(searchValue: string): Observable<Chip2[]>{
    return this.httpClient.get<Chip2[]>(
      `${this.otherURL}/Categorias?main=${searchValue}`
    );
  }

  getNewFilters3(searchValue: string): Observable<Chip2[]>{
    return this.httpClient.get<Chip2[]>(
      `${this.otherURL}/Categorias?etiqueta=${searchValue}`
    );
  }
}
