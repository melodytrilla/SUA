import { Component, OnInit, Input } from '@angular/core';
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
export class OpinadasComponent implements OnInit {
  public datos: any[] =[]
  loading = false;
  total: number =0;
  positivas: number;
  negativas: number;
  neutral: number;
 
  constructor(private api: SolicitudesService,
              private service: BusquedaService) { }

  ngOnInit() {
    this.loading = true;
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
    this.loading = false;
  }
  cambiarFondo(ind, name){
    if (document.getElementById("i-" + ind).style.backgroundColor == "rgb(0, 102, 204)"){
      this.service.borrarOpinion(name)
      document.getElementById("i-" + ind).style.backgroundColor = "rgb(249, 250, 253)"
      document.getElementById("i-" + ind).style.color = "rgba(0, 0, 0, 0.87)"
      document.getElementById("ico-"+ ind).style.color = "rgba(0, 0, 0, 0.87)"
    }
    else{
      this.service.agregarOpinion(name)
      document.getElementById("i-" + ind).style.backgroundColor = "rgb(0, 102, 204)"
      document.getElementById("ico-" + ind).style.color = "white"
      document.getElementById("i-" + ind).style.color = "white"
    }
  }

}
