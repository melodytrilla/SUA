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


  remove(chip: string):void {
    const index = this.chips.indexOf(chip);

    if(index >= 0){
      this.chips.splice(index, 1);
    }
  }

  //Select an option from the select menu
  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.chips.indexOf(event.option.viewValue) < 0){
      //Checks if the option was alredy added.
      //If it has, it ignores it 
      this.chips.push(event.option.viewValue);
    }
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
