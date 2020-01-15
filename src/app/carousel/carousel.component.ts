import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
})
export class CarouselComponent implements OnInit {

  valor=0;
  pause= false;
  
  constructor() { 
  
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.pause){
        this.valor= (this.valor + 1) % 4;
      }
    }, 10000);

  }
togglePlay(){
  this.pause = !this.pause;
}

playPause(){
  this.pause = true;
}



}
