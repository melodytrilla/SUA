import { Component, OnInit, Input } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VerMasComponent } from '../ver-mas/ver-mas.component';

@Component({
  selector: 'app-carta-info',
  templateUrl: './carta-info.component.html',
  styleUrls: ['./carta-info.component.sass']
})
export class CartaInfoComponent implements OnInit {

  constructor(private solicitudes: SolicitudesService,
              public dialog: MatDialog) {
    
   }

  @Input() cardName: string;

  title_style: string = "cardTitle";
  title_value: string;
  content_style: string = "cardContent";
  content_value: number=0;
  max: number=0;

  ngOnInit() {
    if(this.cardName == "solicitudes"){
      this.title_value = "Solicitudes"
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
    if(this.cardName == "solicitudes"){
      this.title_style = "cardTitle-center";
      this.content_style = "cardContent-big";
    }
    this.solicitudes.getDatosVarios(this.cardName).subscribe(data => {
      if(this.cardName == "solicitudes"){
        this.content_value = data.valor
      }
      data.forEach(value => {
        if (value.cantidad_solicitudes > this.content_value){
          this.content_value = value.cantidad_solicitudes
        }
      })
    });
  }
  
  openD(): void{
    this.dialog.open(VerMasComponent, {
      width: '50%',
      data: {info: "ver-mas", name: this.cardName}
    });

  }
}
