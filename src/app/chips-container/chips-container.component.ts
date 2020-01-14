import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { FiltersService } from '../filters.service';
import { startWith, map, filter, reduce, mergeMap, groupBy, zip, toArray } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';

export interface Chip{
  id: number;
  category: string;
  icon: string;
  description: string;
}

export interface Chip2{
  id_subtipo: number;
  categoria: string;
  estilo: string;
  descripcion: string;
}

@Component({
  selector: 'app-chips-container',
  templateUrl: './chips-container.component.html',
  styleUrls: ['./chips-container.component.sass']
})
export class ChipsContainerComponent implements OnInit{

  @ViewChild('search', {static: false}) searchElement: ElementRef;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  searchBoxVisible = false;
  //volver a cambiar a Chip (sacar el 2)
  filteredOptions: Observable<Chip2[]>;
  chips: Chip2[] = [];

  //Chips config
  removable = true;
  selectable = true;
  addOnBlur = true;
  separatorKeys: number[] = [ENTER, COMMA];

  constructor(private filtersService: FiltersService) { }

  ngOnInit() {
    //this.filteredOptions =  this.filtersService.getFilters('');
    this.filteredOptions = this.filtersService.getNewFilters2('');
  }

  onSearchChange (searchValue: string): void {
      //this.filtersService.getFilters(searchValue).subscribe(console.log);
      this.filtersService.getNewFilters2(searchValue).subscribe(console.log);
      this.filteredOptions = this.filtersService.getNewFilters2(searchValue);
    }
//volver a chip y id_subtipo => id
  remove(chip: Chip2):void {
    const index = this.chips.indexOf(chip);

    var removeIndex = this.chips
      .map(function(item) { return item.id_subtipo; }).indexOf(chip.id_subtipo);
    ~removeIndex && this.chips.splice(removeIndex, 1);
   
    if(index >= 0){
      this.chips.splice(index, 1);
    }
  }

  //Select an option from the select menu
  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    var data = this.chips.find( element => { 
      //volver a description
      return element.descripcion === value;});

    if(!data){
      //Checks if the option was alredy added.
      //If it has, it ignores it 
      this.chips.push(event.option.value);
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
