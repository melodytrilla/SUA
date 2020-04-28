import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { BusquedaService } from '../busqueda.service';

@Component({
  selector: 'app-resumen-banner',
  templateUrl: './resumen-banner.component.html',
  styleUrls: ['./resumen-banner.component.sass']
})
export class ResumenBannerComponent implements OnInit {

  alertas;
  message: number;
  editMessage: number;

  constructor(private solicitudesService: SolicitudesService,
              private service: BusquedaService) { }

  ngOnInit() {
    this.service.customMessage.subscribe(msg => this.message = msg);
    this.update();
  }

  update(){
    this.alertas = this.solicitudesService
        .getAlertsStats().subscribe(data => {
          this.alertas = data;
        });
  }

  cambiarFondo(i){
    if (document.getElementById(i).style.backgroundColor == "rgb(0, 102, 204)"){
      this.service.borrarBanner(i);
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).style.backgroundColor = "white"
      document.getElementById(i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("tit-" + i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("ico-" + i).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
      this.service.agregarBanner(i);
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(i).style.color = "white"
      document.getElementById("tit-" + i).style.color = "white"
      document.getElementById("ico-" + i).style.color = "white"
    }
  }

}
