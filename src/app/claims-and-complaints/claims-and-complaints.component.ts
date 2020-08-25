import { Component, OnInit, Input} from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MatDialog } from '@angular/material';
import { VerMasComponent } from '../ver-mas/ver-mas.component';
import { BusquedaService } from '../busqueda.service';
import { FiltersService } from '../filters.service';
import { Chip } from '../chips-container/chips-container.component';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit{

message: number;
editMessage: number;
@Input() title: string;
@Input() subtiposRD: any[];

constructor(private api: SolicitudesService,
            public dialog: MatDialog,
            private service: BusquedaService,
            private filtrosService: FiltersService) { }

loading: boolean;
public data: any[] = []
public total: number = 0;
public i:number =1;
public fon: any[] = [];
public sinFon: any[] = []

ngOnInit(){
  this.loading = true;
  this.service.customMessage.subscribe(msg => this.message = msg);
  this.api.getDatosVarios(this.title).subscribe(data=>{
    data.forEach(value=>{
      this.total = this.total + value.details;
      this.data.push(value);
    })
    if(this.title == 'ReclamosDenuncias'){
      for (let j=0; j < this.data.length; j++){
        let tempChip :Chip = this.filtrosService.searchChip(this.data[j].name);
        for (let k=0; k < this.subtiposRD.length; k++){
          if (JSON.stringify(tempChip) == JSON.stringify(this.subtiposRD[k])){
            this.fon.push(this.data[j].name)
          }
        }
      }
    }
  },
  ()=>{},
  ()=>{if (this.title=='ReclamosDenuncias') {this.addClassStyle()}});
  this.loading = false;
  }

  addClassStyle() {
    let rrd = this.fon
    let data = this.data
    let tit = this.title
    window.onload= function addClass(){
      for(let k=0; k < rrd.length; k++){
        document.getElementById(tit + "-" + rrd[k]).classList.replace('fondo-blanco', 'fondo-azul');
        document.getElementById("ico-" + tit + "-" + rrd[k]).classList.replace('tit-negro', 'tit-blanco')
      }
    }
  };

  open(): void{
    this.dialog.open(VerMasComponent, {
      data: {info: "ver-mas", name: this.title}
    })
  }
  cambiarFondo(name, tit, i){
    if (document.getElementById(tit + "-" + name).classList.contains('fondo-azul')){
      this.service.borrarSubtipo(this.data[i].name);
      this.service.changeMessage(this.editMessage);
      document.getElementById(tit + "-" + name).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("ico-" + tit + "-" + name).classList.replace('tit-blanco', 'tit-negro')
    }
    else{
      let tempChip :Chip = this.filtrosService.searchChip(this.data[i].name);
      if(tempChip != null){
        this.service.agregarSubtipo(tempChip);
        this.service.changeMessage(this.editMessage);
        document.getElementById(tit + "-" + name).classList.replace('fondo-blanco', 'fondo-azul');
        document.getElementById("ico-" + tit + "-" + name).classList.replace('tit-negro', 'tit-blanco')
      }
    }
  }
}
