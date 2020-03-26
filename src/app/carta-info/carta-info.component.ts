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
  content_value: string = "0";

  ngOnInit() {
    this.title_value = this.cardName;
    if(this.cardName == "Solicitudes"){
      this.title_style = "cardTitle-center";
      this.content_style = "cardContent-big";
    }
    this.solicitudes.getDatosVarios(this.cardName).subscribe(data => this.content_value= data[0].valor);
  }

  openD(): void{
    this.dialog.open(VerMasComponent, {
      width: '50%',
      data: {info: "ver-mas", name: this.title_value}
    });

  }
}
