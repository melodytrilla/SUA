import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SolicitudesItemsService } from '../solicitudes-items.service';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.sass']
})
export class VerMasComponent implements AfterViewInit {
  public vecinos: any[] = [];
  constructor(public service: SolicitudesService,
              public api: SolicitudesItemsService,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
  ngAfterViewInit() {
    console.log(this.data.fondo)
    if(this.data.fondo == true){
      console.log(this.data.name + "-0")
      document.getElementById(this.data.name + "-0").style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById(this.data.name + "-0").style.color = "white"
  }

  }
  ngOnInit() {
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
    console.log(this.vecinos)
    })
  }
  

}
}