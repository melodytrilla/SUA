import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MAT_DIALOG_DATA } from '@angular/material';
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
  /*ngAfterViewInit(){
    console.log(this.data.fondo)
    if(this.data.fondo == true){
      document.addEventListener('DOMContentLoaded', function() {
        console.log(document.getElementById("vecinosConSolicitudes-1").classList)
        document.getElementById("vecinosConSolicitudes-1").classList.add("fondo");
      });
    }
  }*/
  ngOnInit() {
    this.bService.customMessage.subscribe(msg => this.message = msg);
    this.bService.customId.subscribe(msg => this.idd = msg);
    if (this.data.name != 'solicitudesConEquipamiento'){
    this.service.getDatosVarios(this.data.name).subscribe(data => {
      this.vecinos= data
  })
  }
  else{
    this.api.getSolicitudes().subscribe(data => {
      data.forEach(value => {
        if(value.etiqueta_equipamiento != ''){
          this.vecinos.push(value)
        }
      })
    })
  }
  if (this.data.fondo== true){
    console.log("true")
    console.log(document.getElementById("vecinosConSolicitudes-1").style.backgroundColor)
    document.getElementById("vecinosConSolicitudes-1").style.backgroundColor = "rgb(0, 102, 204)"
    console.log(document.getElementById("vecinosConSolicitudes-1").style.backgroundColor)
  }

}
cambiarFondo(i, name, id){
    if (document.getElementById(name + "-" + i).style.backgroundColor == "rgb(0, 102, 204)"){
      if (name == "ConsultasReclamos" || name == "ReclamosDenuncias"){
        this.bService.borrarSubtipo(id)
        this.bService.changeMessage(this.editMessage);
      }
      document.getElementById(name + "-" + i).style.backgroundColor = "white"
      document.getElementById(name + "-" + i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("ico-" + name + "-" + i).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
      if (name == "ConsultasReclamos" || name == "ReclamosDenuncias"){
        let tempChip :Chip = this.filtrosService.searchChip(id);
        if(tempChip != null){
          this.bService.agregarSubtipo(tempChip)
          this.bService.changeMessage(this.editMessage);
        }
      }
      document.getElementById(name + "-" + i).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(name + "-" + i).style.color = "white"
      document.getElementById("ico-" + name + "-" + i).style.color = "white"
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