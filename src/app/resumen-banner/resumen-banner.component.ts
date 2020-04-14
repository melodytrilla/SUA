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

  cambiarFondo(i){
    if (document.getElementById(i).style.backgroundColor == "rgb(0, 102, 204)"){
      document.getElementById(i).style.backgroundColor = "white"
      document.getElementById(i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("tit-" + i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("ico-" + i).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
      document.getElementById(i).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(i).style.color = "white"
      document.getElementById("tit-" + i).style.color = "white"
      document.getElementById("ico-" + i).style.color = "white"
    }
  }

}
