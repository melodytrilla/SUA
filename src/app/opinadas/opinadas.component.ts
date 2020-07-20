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
  pos: string;
  titPos: string;
  neg: string;
  titNeg: string;
  neu: string;
  titNeu: string;
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
    if(this.positivo == 'true'){
      this.pos = 'fondo-azul';
      this.titPos = 'tit-blanco'
    }
    else{
      this.pos = 'fondo-blanco'
      this.titPos = 'tit-negro'
    }
    if(this.negativo == 'true'){
      this.neg = 'fondo-azul';
      this.titNeg = 'tit-blanco'
    }
    else{
      this.neg = 'fondo-blanco'
      this.titNeg = 'tit-negro'
    }
    if(this.neutro == 'true'){
      this.neu = 'fondo-azul';
      this.titNeu = 'tit-blanco'
    }
    else{
      this.neu = 'fondo-blanco'
      this.titNeu = 'tit-negro'
    }
    this.loading = false;
  }

 
  
  cambiarFondo(ind, name){
    if (document.getElementById("i-" + ind).classList.contains('fondo-azul')){
      this.service.borrarOpinion(name)
      this.service.changeMessage(this.editMessage);
      document.getElementById("i-" + ind).classList.replace('fondo-azul', 'fondo-blanco');
      document.getElementById("ico-" + ind).classList.replace('tit-blanco', 'tit-negro')
    }
    else{
      this.service.agregarOpinion(name)
      this.service.changeMessage(this.editMessage);
      document.getElementById("i-" + ind).classList.replace('fondo-blanco', 'fondo-azul');
      document.getElementById("ico-" + ind).classList.replace('tit-negro', 'tit-blanco')
    }
  }

}
