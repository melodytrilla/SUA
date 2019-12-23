import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chip } from './chips-container/chips-container.component';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  apiURL = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  //Obtiene los datos del banner del dashboard
  getFilters (searchValue: string): Observable<Chip[]> {
    return this.httpClient.get<Chip[]>(
      `${this.apiURL}/filters?search=${searchValue}`);
  }
}
