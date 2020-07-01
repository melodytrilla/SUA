import { Component, OnInit, Input} from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { BusquedaService } from '../busqueda.service';

@Component({
  selector: 'app-opinadas',
  templateUrl: './opinadas.component.html',
  styleUrls: ['./opinadas.component.sass'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-100%)'}),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({transform: 'translateY(-100%)'}))
        ])
    ])
]
})
export class OpinadasComponent implements OnInit{

  
  public datos: any[] =[]
  loading = false;
  total: number =0;
  positivas: number;
  negativas: number;
  neutral: number;
  message: number;
  editMessage: number;
  neu: string;
  icoN: string;
  constructor(private api: SolicitudesService,
              private service: BusquedaService) { }

  @Input() positivo: string;
  @Input() negativo: string;
  @Input() neutro: string;
  
  ngOnInit() {
    this.loading = true;
    this.service.customMessage.subscribe(msg => this.message = msg);
    this.api.getDatosVarios('Opinadas').subscribe(data=>{
      data.forEach(value=>{
        this.total = this.total + value.details;
      })
      data.forEach(value =>{
        this.datos.push(value);
        if(value.name == 'Positivas'){
          this.positivas = value.details * 100 / this.total
        }
        else if(value.name == 'Negativas'){
          this.negativas = value.details * 100 / this.total
        }
        else if(value.name == 'Neutral'){
          this.neutral = value.details * 100 / this.total
        }
      })
    });
    /*
    if(this.neutro == 'true'){
      this.neu = 'i-0';
      this.icoN = 'ico-0'
    }
    else{
      this.neu = 'fondoBlanco'
    }*/
    this.loading = false;
  }

 
  
  cambiarFondo(ind, name){
    if (document.getElementById("i-" + ind).style.backgroundColor == "rgb(0, 102, 204)"){
      this.service.borrarOpinion(name)
      this.service.changeMessage(this.editMessage);
      document.getElementById("i-" + ind).style.backgroundColor = "rgb(249, 250, 253)"
      document.getElementById("i-" + ind).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("ico-"+ ind).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
      this.service.agregarOpinion(name)
      this.service.changeMessage(this.editMessage);
      document.getElementById("i-" + ind).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById("ico-" + ind).style.color = "white"
      document.getElementById("i-" + ind).style.color = "white"
    }
  }

}
