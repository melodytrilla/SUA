import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-resumen-banner',
  templateUrl: './resumen-banner.component.html',
  styleUrls: ['./resumen-banner.component.sass']
})
export class ResumenBannerComponent implements OnInit {

  alertas;

  constructor(private solicitudesService: SolicitudesService) { }

  ngOnInit() {
    this.update();
  }

  update(){
    this.alertas = this.solicitudesService
        .getAlertsStats().subscribe(data => {
          this.alertas = data;
        });
  }

}
