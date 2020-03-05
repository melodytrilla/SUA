import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-queries-and-formalities',
  templateUrl: './queries-and-formalities.component.html',
  styleUrls: ['./queries-and-formalities.component.sass']
})
export class QueriesAndFormalitiesComponent implements OnInit {

  constructor(private solicitudeService: SolicitudesService,
              private router: Router) { }

  public items: any[];
  public total: number = 0;

  ngOnInit() {
    this.solicitudeService.getTopConsultasTramites().subscribe(
      data => {
        this.total = data.total
        data.valores.forEach(value =>{
          if(value.name.length > 32){
            value.name = value.name.substr(0, 29) + "...";
          }
        })
        this.items = data.valores
      });
  }
  sendToList(a){
    let url= `/listado/${a}`;
    this.router.navigateByUrl(url)
  }
  sendToMap(a){
    let url= `/mapa/${a}`;
    this.router.navigateByUrl(url)
  }
}
