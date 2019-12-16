import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatInputModule} from '@angular/material/input'


export interface Chip{
  value: string;
}

@Component({
  selector: 'app-chips-container',
  templateUrl: './chips-container.component.html',
  styleUrls: ['./chips-container.component.sass']
})
export class ChipsContainerComponent {

  @ViewChild('search', {static: false}) searchElement: ElementRef;
  searchBoxVisible = false;
  removable = true;
  selectable = true;

  addOnBlur = true;

  separatorKeys: number[] = [ENTER, COMMA];

  chips: Chip[]=[
    {value:'elemento 1'},
    {value:'elemento 2'},
    {value:'elemento 3'},
    {value:'elemento 3'},
    {value:'elemento 4'}
  ];

  add(event: MatChipInputEvent):void{
    const input = event.input;
    const value = event.value;

    if((value || '').trim()){
      this.chips.push({value:value.trim()});
    }

    if(input){
      input.value = '';
    }
  }

  remove(chip: Chip):void {
    const index = this.chips.indexOf(chip);

    if(index >= 0){
      this.chips.splice(index, 1);
    }
  }

  showSearch() : void {
    this.searchBoxVisible = !this.searchBoxVisible;
    // Focus on the search bar after the boolean has changed
    setTimeout(()=>{ 
      this.searchElement.nativeElement.focus();
    },0);  
  }


}
