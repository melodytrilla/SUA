import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  apiURL = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  //Obtiene los datos del banner del dashboard
  getFilters (searchValue: string): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.apiURL}/filters?search=${searchValue}`);
  }
}
