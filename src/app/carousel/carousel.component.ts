import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
})
export class CarouselComponent implements OnInit {

  //el valor se usa para saber en que diapositiva esta
  valor=0;
  //si esta pausado o no
  pause= false;
  
  constructor() { 
  
  }
  //se inicializa el temporizador que movera a la diapositiva si no esta pausada
  ngOnInit() {
    setInterval(() => {
      if (!this.pause){
        this.valor= (this.valor + 1) % 4;
      }
    }, 10000);

  }

  //cambia el estado de pause al opuesto
togglePlay(){
  this.pause = !this.pause;
}

playPause(){
  this.pause = true;
}



}
