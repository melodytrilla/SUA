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
      this.rei = 'fondo-azul';
      this.titReit='tit-blanco'
    }
    else{
      this.rei = 'fondo-blanco'
      this.titReit='tit-negro'
    }
    if(this.intervenciones_sin == 'sin'){
      this.int ='fondo-azul';
      this.titInt= 'tit-blanco';
    }
    else{
      this.int = 'fondo-blanco'
      this.titInt='tit-negro'
    }
    if(this.asignaciones_sin == 'sin'){
      this.asig ='fondo-azul';
      this.titAsig= 'tit-blanco';
    }
    else{
      this.asig = 'fondo-blanco'
      this.titAsig='tit-negro'
    }
  }

  update(){
    this.alertas = this.solicitudesService
        .getAlertsStats().subscribe(data => {
          this.alertas = data;
        });
  }

  cambiarFondo(i){
    if (document.getElementById(i).classList.contains('fondo-azul')){
      this.service.borrarBanner(i);
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("tit-" + i).classList.replace('tit-blanco', 'tit-negro')
      document.getElementById("ico-" + i).classList.replace('tit-blanco', 'tit-negro')
    }
    else{
      this.service.agregarBanner(i);
      this.service.changeMessage(this.editMessage);
      document.getElementById(i).classList.replace('fondo-blanco', 'fondo-azul');
      document.getElementById("tit-" + i).classList.replace('tit-negro', 'tit-blanco')
      document.getElementById("ico-" + i).classList.replace('tit-negro', 'tit-blanco')
    }
  }

}
