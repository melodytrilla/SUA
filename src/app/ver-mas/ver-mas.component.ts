import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.sass']
})
export class VerMasComponent implements OnInit {
  public vecinos: any[] = [];

  constructor(public service: SolicitudesService) { }
  

  ngOnInit() {
    this.service.getVecinos().subscribe(data => {
      this.vecinos= data
  });

}
}