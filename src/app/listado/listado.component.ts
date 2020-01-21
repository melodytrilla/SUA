import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import * as _ from 'lodash';

export interface Opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {
  asc= false;

  constructor(
    public api: SolicitudesService) { }

  public items: any[];

  ngOnInit() {
    this.api.getItems().subscribe(
      data => {
        data.forEach(value =>{
          if(value.descripcion.length > 50){
            value.descripcion = value.descripcion.substr(0, 47) + "...";
          }
          if(value.descEstado.length > 55){
            value.descEstado = value.descEstado.substr(0, 52) + "...";
          }
          if(value.direccion.length > 50){
            value.direccion = value.direccion.substr(0, 47) + "...";
          }
        })
        this.items = data
      });
}
  togglePlay(){
    this.asc = !this.asc;
  }
}

