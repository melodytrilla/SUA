import { Component, OnInit, Input } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VerMasComponent } from '../ver-mas/ver-mas.component';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import { BusquedaService } from '../busqueda.service';

@Component({
  selector: 'app-carta-info',
  templateUrl: './carta-info.component.html',
  styleUrls: ['./carta-info.component.sass']
})
export class CartaInfoComponent implements OnInit {

  constructor(private solicitudes: SolicitudesService,
              public dialog: MatDialog,
              private solicItems: SolicitudesItemsService,
              private service: BusquedaService) {
    
   }

  @Input() cardName: string;
  @Input() idSolic: string;

  title_style: string = "cardTitle";
  title_value: string;
  content_style: string = "cardContent";
  content_value: number=0;
  max: number=0;
  arr: any[] = [];
  fondoAzul: boolean = false;
  message: number;
  editMessage: number;
  id: string;
  idd: string;
  editId: string;

  ngOnInit() {
    this.service.customMessage.subscribe(msg => this.message = msg);
    this.service.customId.subscribe(msg => this.idd = msg);
    if(this.cardName == "solicitudes"){
      this.title_value = "Solicitudes"
      this.title_style = "cardTitle-center";
      this.content_style = "cardContent-big";
    }
    else if(this.cardName == "vecinosConSolicitudes"){
      this.title_value = "Vecino con más solicitudes"
    }
    else if(this.cardName == "agentesConSolicitudes"){
      this.title_value = "Agente con más solicitudes"
    }
    else if(this.cardName == "equipamientoConSolicitudes"){
      this.title_value = "Equipamiento con más solicitudes"
    }
    if (this.cardName == 'solicitudesConEquipamiento'){
      this.title_value = "Solicitudes con equipamiento"
      this.solicItems.getSolicitudes().subscribe(data => {
        data.forEach(value => {
          if (value.etiqueta_equipamiento != ""){
            this.arr.push(value);
            }
            this.content_value = this.arr.length
          }
        )
      })
      
    }
    else {
      this.solicitudes.getDatosVarios(this.cardName).subscribe(data => {
      if(this.cardName == "solicitudes"){
        this.content_value = data.valor
      }
      data.forEach(value => {
        if (value.cantidad_solicitudes > this.content_value){
          this.content_value = value.cantidad_solicitudes
          if(this.cardName == "vecinosConSolicitudes"){
            this.id = value.dni_solicitante
          }
        }
      })
    });}
  }

  cambiarFondo(i){
    console.log(i)
    if (document.getElementById(i).style.backgroundColor == "rgb(0, 102, 204)"){
      this.service.borrarCard(i, this.id)
      document.getElementById(i).style.backgroundColor = "rgb(249, 250, 253)"
      document.getElementById(i).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("num-" + i).style.color = "rgba(0, 0, 0, 0.87)"
      this.fondoAzul= false;
    }
    else{
      this.service.agregarCard(i, this.id)
      document.getElementById(i).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(i).style.color = "white"
      document.getElementById("num-" + i).style.color = "white"
      this.fondoAzul = true;
    }
    this.service.changeMessage(this.editMessage);
    if (i == 'Vecino con más solicitudes'){
      this.service.changeId(this.editId)
    }
  }
  
  openD(): void{
    this.dialog.open(VerMasComponent, {
      data: {info: "ver-mas", name: this.cardName, fondo: this.fondoAzul}
    });

  }

}
