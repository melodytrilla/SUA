import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  apiURL = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  //Obtiene los datos del banner del dashboard
  getAlertsStats (): Observable<Object> {
    return this.httpClient.get<Object>(
      `${this.apiURL}/alertas`);
  }

  getTopReclamosDenuncias () : Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/reclamos`
    )
  }

  getTopConsultasTramites () : Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/consultas`
    )
  }

  getSolicitudesporEstado (): Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/porEstado`
    )
  }

  getOpiniones(): Observable<any>{
    return this.httpClient.get<any>(
      `${this.apiURL}/Opinadas`
    )
  }

  get10Categorias(): Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/top10-categorias`
    )
  }

  get10Vecinales(): Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/top10-vecinales`
    )
  }

  getporDistrito():Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/porDistrito`
    )
  }

  getporOrigen():Observable<any[]>{
    return this.httpClient.get<any[]>(
      `${this.apiURL}/porOrigen`
    )
  }

  getItems(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.apiURL}/items`
    )
  }
}
