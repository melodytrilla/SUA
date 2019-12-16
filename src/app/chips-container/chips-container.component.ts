import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { FiltersService } from '../filters.service';
import { startWith, map, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';

@Component({
  selector: 'app-chips-container',
  templateUrl: './chips-container.component.html',
  styleUrls: ['./chips-container.component.sass']
})
export class ChipsContainerComponent implements OnInit{

  @ViewChild('search', {static: false}) searchElement: ElementRef;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  searchBoxVisible = false;
  filteredOptions: Observable<string[]>;
  chips: string[] = [];

  //Chips config
  removable = true;
  selectable = true;
  addOnBlur = true;
  separatorKeys: number[] = [ENTER, COMMA];

  constructor(private filtersService: FiltersService) { }

  ngOnInit() {
    this.filteredOptions =  this.filtersService.getFilters('');
  }

  onSearchChange (searchValue: string): void {  
    this.filteredOptions =  this.filtersService.getFilters(searchValue);
  }

  add(event: MatChipInputEvent):void{

    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

     console.log(value, this.chips);

      if((value || '').trim()){
        this.chips.push(value.trim());
      }

      if(input){
        input.value = '';
      }
    }
  }

  remove(chip: string):void {
    const index = this.chips.indexOf(chip);

    if(index >= 0){
      this.chips.splice(index, 1);
    }
  }

  //Select an option from the select menu
  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.viewValue);
    this.searchElement.nativeElement.value = '';
  }

  showSearch() : void {
    this.searchBoxVisible = !this.searchBoxVisible;
    // Focus on the search bar after the boolean has changed
    setTimeout(()=>{ 
      this.searchElement.nativeElement.focus();
    },0);  
  }


}
