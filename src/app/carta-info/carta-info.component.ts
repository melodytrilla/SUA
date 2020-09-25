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

  // el nombre de la carta
  @Input() cardName: string;
  // id del vecino solo para la carta de vecinos con mas solicitudes
  @Input() idSolic: string;

  title_style: string = "cardTitle";
  title_value: string;
  content_style: string = "cardContent";
  content_value: number=0;
  //el max se utilizara cundo tegamos un numero maximo de solicitudes?
  max: number=0;
  arr: any[] = [];
  fondoAzul: boolean = false;
  message: number;
  editMessage: number;
  id: string;
  idd: string;
  editId: string;
  vec: string;
  titVec: string;


  ngOnInit() {
    // para que se ussaban message y idd?
    this.service.customMessage.subscribe(msg => this.message = msg);
    this.service.customId.subscribe(msg => this.idd = msg);

    //esto lo podria separar en su propio metodo ya que es para ponerle el titulo a la carta
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

    // esto es para buscar los datos de la carta. aca dberia poner el loading
    if (this.cardName == 'solicitudesConEquipamiento'){
      //los anteriores ponen titulos en la carta pero este pone titulo y busca los datos
      //no deberiamos o separarlo o hacer que cada uno cuando ponga el titulo tambien ponga datos
      this.title_value = "Solicitudes con equipamiento"
      this.solicItems.getSolicitudes().subscribe(data => {
        data.forEach(value => {
          if (value.etiqueta_equipamiento != ""){
            // porque hace un array push? creo que solo necesita la cantidad, no?
            //entonces no seria mejor poner:
            // content_value ++; o como sea el incrementador
            this.arr.push(value);
          }
          this.content_value = this.arr.length
        })
      })
      
    }
    // no entiendo un par de cosas:
    // 1- si es solicitudes le das el data.valor pero entra igual e el siguiente foreach?
    // 2- para lo otro vos estas recorriendo todos los items en el foreach y remplazando el valor por el mayor
    //    no seria mejor traer la lista en orden y usar el primer elemento. Encontre que se puede usar esto:
    //    http://localhost:3000/vecinosConSolicitudes?_sort=cantidad_solicitudes&_order=desc&_limit=1

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
              this.iniciarFondo('Vecino con más solicitudes')
            }
          }
        })
      });
    }
  }

  // Deberia separar la inicializacion del estilo con la busqueda de datos 
  // y despeues pasarle los datos due conseguimos 

  iniciarFondo(tit){
    if(this.id == this.idSolic){
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
  
  openD(): void{
    this.dialog.open(VerMasComponent, {
      data: {info: "ver-mas", name: this.cardName, fondo: this.fondoAzul}
    });

  }

}
