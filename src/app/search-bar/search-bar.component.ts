import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

  public dateMask = {
    guide: false,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };

  public yearMask = {
    guide: false,
    showMask : true,
    mask: [/\d/,/\d/,/\d/,/\d/]
  };
  
  form: FormGroup;
  inlineRange;
  
  constructor() {
    this.form = new FormGroup({
      date: new FormControl([{begin: new Date(2018, 7, 5), end: new Date(2018, 7, 25)}]),
    });
  }

  inlineRangeChange($event) {
    this.inlineRange = $event;
  }

  ngOnInit() {
  }

}
