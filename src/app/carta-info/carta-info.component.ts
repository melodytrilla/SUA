import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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
export class CartaInfoComponent implements OnInit, AfterViewInit {

  constructor(private solicitudes: SolicitudesService,
              public dialog: MatDialog,
              private solicItems: SolicitudesItemsService,
              private service: BusquedaService) {
    
  }

  // el nombre de la carta
  @Input() cardName: string;
  // id del vecino solo para la carta de vecinos con mas solicitudes
  @Input() idSolic: string;

  title_style: string = "cardTitle";
  title_value: string;
  content_style: string = "cardContent";
  content_value: number=0;
  arr: any[] = [];
  //fondoAzul es un booleano que sigue si el fondo cambio de color o no
  fondoAzul: boolean = false;
  editMessage: number;
  id: string;
  editId: string;

  ngOnInit(){}

  ngAfterViewInit() {

    // Función para asignar el titulo de cada carta
    this.tituloCarta();

    // esto es para buscar los datos de la carta
    if (this.cardName == 'solicitudesConEquipamiento'){
      //la carta Solicitudes con equipamiento muestra la cantidad de solicitudes que tienen equipamiento
      this.title_value = "Solicitudes con equipamiento"
      this.solicItems.getSolicitudes().subscribe(data => {
        data.forEach(value => {
          //Si el campo etiqueta_equipamiento tiene un valor significa que tiene equipamiento, entonces suma una solicitud con equipamiento
          if (value.etiqueta_equipamiento != ""){
            this.content_value++;
          }
        })
      })
    }
    else {
      if(this.cardName == "solicitudes"){
        this.title_value = "Solicitudes"
        this.title_style = "cardTitle-center";
        this.content_style = "cardContent-big";
        //trae la cantidad total de solicitudes
        this.solicitudes.getDatosVarios(this.cardName).subscribe(data => {
          this.content_value = data.valor
        })
      }
      else{
        // trae el vecino, equipamiento o agente que tenga mayor cantidad de solicitudes
        this.solicitudes.getConMasSolicitudes(this.cardName).subscribe(data => 
          data.forEach(value => {this.content_value = value.cantidad_solicitudes;
            if(this.cardName == "vecinosConSolicitudes"){
              this.title_value = "Vecino con más solicitudes"
              //dni del vecino con más solicitudes
              this.id = value.dni_solicitante
              this.iniciarFondo()
            }
          }))
        }
      }
     }

  iniciarFondo(){
    let id = this.id
    let idSolic = this.idSolic
    let tit = this.title_value
    console.log("tit",tit)
    window.onload = function iniciar(){
      console.log(tit)
      if(id == idSolic){  
        document.getElementById(tit).classList.replace('fondo-blanco', 'fondo-azul')
        document.getElementById("num-" + tit).classList.replace('tit-negro', 'tit-blanco')

        this.fondoAzul = true
      }
      else{
        document.getElementById(tit).classList.add('fondo-blanco')
        document.getElementById("num-" + tit).classList.add('tit-negro')
        this.fondoAzul = false
        
      }
    } 
  }

  tituloCarta(){
    //Pone el titulo a las cartas que no le puso antes
    if(this.cardName == "agentesConSolicitudes"){
      this.title_value = "Agente con más solicitudes"
    }
    else if(this.cardName == "equipamientoConSolicitudes"){
      this.title_value = "Equipamiento con más solicitudes"
    }
  }

  cambiarFondo(i){
    if (document.getElementById(i).classList.contains('fondo-azul')){
      this.service.borrarCard(i, this.id)
      document.getElementById(i).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("num-" + i).classList.replace('tit-blanco', 'tit-negro')
      this.fondoAzul= false
    }
    else{
      this.service.agregarCard(i, this.id)
      document.getElementById(i).classList.replace('fondo-blanco', 'fondo-azul');
      document.getElementById("num-" + i).classList.replace('tit-negro', 'tit-blanco')
      this.fondoAzul = true
    }
    this.service.changeMessage(this.editMessage);
    if (i == 'Vecino con más solicitudes'){
      this.service.changeId(this.editId)
    }
  }
  
  // abre el componenete ver mas cuando se apreta la flecha
  openD(): void{
    this.dialog.open(VerMasComponent, {
      data: {info: "ver-mas", name: this.cardName, fondo: this.fondoAzul}
    });

  }

}
