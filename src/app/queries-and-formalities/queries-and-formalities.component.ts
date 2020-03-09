import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-queries-and-formalities',
  templateUrl: './queries-and-formalities.component.html',
  styleUrls: ['./queries-and-formalities.component.sass']
})
export class QueriesAndFormalitiesComponent implements OnInit {

  constructor(private solicitudeService: SolicitudesService) { }

  public items: any[];
  public total: number = 0;

  ngOnInit() {
    this.solicitudeService.getTopConsultasTramites().subscribe(
      data => {
        this.total = data.total
        this.items = data.valores
      });
  }
}
