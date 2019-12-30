import { Component, OnInit } from '@angular/core';
import { ListadoService } from '../listado.service';

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

  constructor(private listadoService: ListadoService) { }
  items= [];

  ngOnInit() {
    this.getItems();
  }
  getItems(){
    this.items = this.listadoService.getItems();
  }

  togglePlay(){
    this.asc = !this.asc;
  }

}
