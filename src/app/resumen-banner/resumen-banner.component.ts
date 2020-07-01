import { Component, OnInit, Input} from '@angular/core';
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
  rei: string;
  titReit: string;
  int: string;
  titInt: string;
  asig: string;
  titAsig: string;

  constructor(private solicitudesService: SolicitudesService,
              private service: BusquedaService) { }

  @Input() reiteradas_con: string;
  @Input() reiteradas_sin: string;
  @Input() intervenciones_sin: string;
  @Input() asignaciones_sin: string;

  ngOnInit() {
    this.service.customMessage.subscribe(msg => this.message = msg);
    this.update();
    if(this.reiteradas_con == 'true' && this.reiteradas_sin =='false'){
      this.rei = 'reit';
      this.titReit='tit-reit-blanco'
    }
    else{
      this.rei = 'reit-blanco'
      this.titReit='tit-reit-negro'
    }
    if(this.intervenciones_sin == 'sin'){
      this.int ='reit';
      this.titInt= 'tit-reit-blanco';
    }
    else{
      this.int = 'reit-blanco'
      this.titInt='tit-reit-negro'
    }
    if(this.asignaciones_sin == 'sin'){
      this.asig ='reit';
      this.titAsig= 'tit-reit-blanco';
    }
    else{
      this.asig = 'reit-blanco'
      this.titAsig='tit-reit-negro'
    }
  }

  update(){
    this.alertas = this.solicitudesService
        .getAlertsStats().subscribe(data => {
          this.alertas = data;
        });
  }

  cambiarFondo(i){
    if (document.getElementById(i).classList.contains('reit') ){
      this.service.borrarBanner(i);
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).classList.remove('reit');
      document.getElementById(i).classList.add('reit-blanco');
      document.getElementById("tit-" + i).classList.remove('tit-reit-blanco')
      document.getElementById("tit-" + i).classList.add('tit-reit-negro')
      document.getElementById("ico-" + i).classList.remove('tit-reit-blanco')
      document.getElementById("ico-" + i).classList.add('tit-reit-negro')
      /*document.getElementById(i).style.backgroundColor = "white"
      document.getElementById(i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("tit-" + i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("ico-" + i).style.color = "rgba(0, 0, 0, 0.87)"*/
    }
    else{
      this.service.agregarBanner(i);
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).classList.remove('reit-blanco');
      document.getElementById(i).classList.add('reit');
      document.getElementById("tit-" + i).classList.remove('tit-reit-negro')
      document.getElementById("tit-" + i).classList.add('tit-reit-blanco')
      document.getElementById("ico-" + i).classList.remove('tit-reit-negro')
      document.getElementById("ico-" + i).classList.add('tit-reit-blanco')
      /*document.getElementById(i).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(i).style.color = "white"
      document.getElementById("tit-" + i).style.color = "white"
      document.getElementById("ico-" + i).style.color = "white"*/
    }
  }

}
