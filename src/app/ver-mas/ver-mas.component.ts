import { Component, OnInit, Inject} from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MAT_DIALOG_DATA} from '@angular/material';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import { BusquedaService } from '../busqueda.service';
import { FiltersService } from '../filters.service';
import { Chip } from '../chips-container/chips-container.component';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.sass']
})
export class VerMasComponent implements OnInit {

  message: number;
  editMessage: number;
  public vecinos: any[] = [];

  constructor(public service: SolicitudesService,
              public api: SolicitudesItemsService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private bService: BusquedaService,
              private filtrosService: FiltersService
              ) { 
                
              }
  idd: string;
  editId: string;

  ngOnInit() {
    this.bService.customMessage.subscribe(msg => this.message = msg);
    this.bService.customId.subscribe(msg => this.idd = msg);
    if (this.data.name != 'solicitudesConEquipamiento'){
    this.service.getDatosVarios(this.data.name).subscribe(data => {
      this.vecinos= data
  })}
  else{
    this.api.getSolicitudes().subscribe(data => {
      data.forEach(value => {
        if(value.etiqueta_equipamiento != ''){
          this.vecinos.push(value)
        }
      })
    })
  }
}


cambiarFondo(name, tit, i){
    if (document.getElementById("vermas-" + tit + "-" + name).classList.contains('fondo-azul')){
      if (tit == "ConsultasReclamos" || tit == "ReclamosDenuncias"){
        this.bService.borrarSubtipo(this.vecinos[i].name)
        this.bService.changeMessage(this.editMessage);
      }
      document.getElementById("vermas-" + tit + "-" + name).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("vermas-ico-" + tit + "-" + name).classList.replace('tit-blanco', 'tit-negro');
      document.getElementById(tit + "-" + name).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("ico-" + tit + "-" + name).classList.replace('tit-blanco', 'tit-negro')
    }
    else{
      console.log(tit)
      if (tit == "ConsultasReclamos" || tit == "ReclamosDenuncias"){
        let tempChip :Chip = this.filtrosService.searchChip(this.vecinos[i].name);
        if(tempChip != null){
          this.bService.agregarSubtipo(tempChip)
          this.bService.changeMessage(this.editMessage);
          document.getElementById("vermas-" + tit + "-" + name).classList.replace('fondo-blanco', 'fondo-azul');
          document.getElementById("vermas-ico-" + tit + "-" + name).classList.replace('tit-negro', 'tit-blanco');
          document.getElementById(tit + "-" + name).classList.replace('fondo-blanco', 'fondo-azul');
          document.getElementById("ico-" + tit + "-" + name).classList.replace('tit-negro', 'tit-blanco')
        }
      }
    }
  }
  
  cambiarFondoI(i, name, l, id){
    var k;
    console.log(name, id)
    if(document.getElementById(name + "-" + i).style.backgroundColor == "rgb(0, 102, 204)"){
        if(name=='vecinosConSolicitudes'){
          this.bService.borrarCard('Vecino con más solicitudes', id)
        }
        document.getElementById(name + "-" + i).style.backgroundColor = "white"
        document.getElementById(name + "-" + i).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
        for(k = 0; k < l; k++) {
          document.getElementById(name + "-" + k).style.backgroundColor = "white"
          document.getElementById(name + "-" + k).style.color = "rgba(0, 0, 0, 0.87)"
          if(k==i){
            if(document.getElementById(name + "-" + k).style.backgroundColor == "white"){
              if(name=='vecinosConSolicitudes'){
                this.bService.agregarCard('Vecino con más solicitudes', id)
              }
              document.getElementById(name + "-" + k).style.backgroundColor = "rgb(0, 102, 204)"
              document.getElementById(name + "-" + k).style.color = "white"
            }
          }
        }
      }
    this.bService.changeMessage(this.editMessage);
    if (name == 'vecinosConSolicitudes'){
      this.bService.changeId(this.editId)
    }
    }
}