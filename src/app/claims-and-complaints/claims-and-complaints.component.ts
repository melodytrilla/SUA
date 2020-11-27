import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MatDialog } from '@angular/material';
import { VerMasComponent } from '../ver-mas/ver-mas.component';
import { BusquedaService } from '../busqueda.service';
import { FiltersService } from '../filters.service';
import { Chip } from '../chips-container/chips-container.component';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { BuiltinTypeName } from '@angular/compiler';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit, AfterViewInit{

message: number;
editMessage: number;
@Input() title: string;
@Input() subtiposSeleccionado: any[];

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

ngOnInit(){}

ngAfterViewInit(){
  //loading indica que se esta cargardo
  this.loading = true;
  //asigna a la varaible message el valor del customMessage en busqueda Service
  this.service.customMessage.subscribe(msg => this.message = msg);
  //consigue todos los valores de los datos y los suma en una variable total para mostrar en la pagina
  this.api.getDatosVarios(this.title).subscribe(data=>{
    data.forEach(value=>{
      this.total = this.total + value.details;
      this.data.push(value);
    })
    // 
    if(this.title == 'ReclamosDenuncias' && this.subtiposSeleccionado.length > 0){
      for (let j=0; j < this.data.length; j++){
        let tempChip :Chip = this.filtrosService.searchChip(this.data[j].name);
        for (let k=0; k < this.subtiposSeleccionado.length; k++){
          if (JSON.stringify(tempChip) == JSON.stringify(this.subtiposSeleccionado[k])){
            this.fon.push(this.data[j].name)
          }
        }
      }
    }
    //indica que termino de cargar
    this.loading = false;
  })

}
  //es una funcion para que cada item empieze con el color blanco
  addClassStyle() {
    let rrd = this.fon
    let tit = this.title
    window.onload= function addClass(){
      for(let k=0; k < rrd.length; k++){
        document.getElementById(tit + "-" + rrd[k]).classList.replace('fondo-blanco', 'fondo-azul');
        document.getElementById("ico-" + tit + "-" + rrd[k]).classList.replace('tit-negro', 'tit-blanco');
      }
    }
  };

  //se usa cuando se apreta el ver mas y abre una ventana con mas elementos de la lista y los hace azules cuando corresponde
  open(): void{
    let rrd = this.service.getSubtipos();
    let tit  = this.title;
    this.dialog.open(VerMasComponent, {
      data: {info: "ver-mas", name: this.title, subt: this.subtiposSeleccionado}
    }).afterOpened().subscribe(data => {
      for(let k=0; k < rrd.length; k++){
        document.getElementById("vermas-" + tit + "-" + rrd[k].descripcion).classList.replace('fondo-blanco', 'fondo-azul');
        document.getElementById("vermas-ico-" + tit + "-" + rrd[k].descripcion).classList.replace('tit-negro', 'tit-blanco')
      }
});
  }

  //esta funcion es  para cambiar el fodo de los items ya buscados de blanco a azul o vice versa
  cambiarFondo(name, tit, i){
    if (document.getElementById(tit + "-" + name).classList.contains('fondo-azul')){
      this.service.borrarSubtipo(this.data[i].name);
      this.service.changeMessage(this.editMessage);
      document.getElementById(tit + "-" + name).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("ico-" + tit + "-" + name).classList.replace('tit-blanco', 'tit-negro');
    }
    else{
      let tempChip :Chip = this.filtrosService.searchChip(this.data[i].name);
      if(tempChip != null){
        this.service.agregarSubtipo(tempChip);
        this.service.changeMessage(this.editMessage);
        document.getElementById(tit + "-" + name).classList.replace('fondo-blanco', 'fondo-azul');
        document.getElementById("ico-" + tit + "-" + name).classList.replace('tit-negro', 'tit-blanco');
      }
    }
  }
}
