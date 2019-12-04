import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.sass'],
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
export class RatingBarComponent implements OnInit {

  opiniones = {
    'positivo': 57,
    'negativo': 23,
    'neutral': 20,
  }

  hidden : Boolean;

  ngOnInit() {
    this.hidden = true;
  }

  getColor(){
    var max;
    for (var h in this.opiniones) {
      if (!max || (this.opiniones[h] > this.opiniones[max])) {
        max = h;
      }
    }
    return max;
  }

  toggleDisplay(){
    this.hidden = !this.hidden;
  }

}
