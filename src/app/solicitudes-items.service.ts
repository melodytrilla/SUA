import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesItemsService {

  apiURL = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }
  getSolicitudes(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.apiURL}/solicitudes`
    )
  }
}
