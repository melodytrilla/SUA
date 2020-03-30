import { Component, OnInit, Input } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VerMasComponent } from '../ver-mas/ver-mas.component';
import { SolicitudesItemsService } from '../solicitudes-items.service';

@Component({
  selector: 'app-carta-info',
  templateUrl: './carta-info.component.html',
  styleUrls: ['./carta-info.component.sass']
})
export class CartaInfoComponent implements OnInit {

  constructor(private solicitudes: SolicitudesService,
              public dialog: MatDialog,
              private solicItems: SolicitudesItemsService) {
    
   }

  @Input() cardName: string;

  title_style: string = "cardTitle";
  title_value: string;
  content_style: string = "cardContent";
  content_value: number=0;
  max: number=0;
  arr: any[] = [];

  ngOnInit() {
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
        }
      })
    });}
  }
  
  openD(): void{
    this.dialog.open(VerMasComponent, {
      width: '50%',
      height: '90%',
      data: {info: "ver-mas", name: this.cardName}
    });

  }
}
