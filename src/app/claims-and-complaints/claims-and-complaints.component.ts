import { Component, OnInit, Input } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MatDialog } from '@angular/material';
import { VerMasComponent } from '../ver-mas/ver-mas.component';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit{

@Input() title: string;

constructor(private api: SolicitudesService,
            public dialog: MatDialog) { }
loading: boolean;
public data: any[] = []
public total: number = 0;
public i:number =1;

ngOnInit(){
  this.loading = true;
  this.api.getDatosVarios(this.title).subscribe(data=>{
    data.forEach(value=>{
      this.total = this.total + value.details;
    })
    data.forEach(value =>{
      this.data.push(value);
    })
  });
  this.loading = false;
  }

  open(): void{
    console.log(this.title)
    this.dialog.open(VerMasComponent, {
      width: '50%',
      data: {info: "ver-mas", name: this.title}
    })
  }
}
