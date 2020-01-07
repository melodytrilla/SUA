import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
