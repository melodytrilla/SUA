import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of} from 'rxjs';
import { FiltersService } from '../filters.service';
import { startWith, map, filter, reduce, mergeMap, groupBy, zip, toArray } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';

export interface Chip{
  id_subtipo: number;
  categoria: string;
  estilo: string;
  descripcion: string;
  descripcion_ext: string;
  etiquetas: string;
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
  filteredCategories: string[] = [];
  filteredOptions: Chip[];
  chips: Chip[] = [];

  //Chips config
  removable = true;
  selectable = true;
  addOnBlur = true;
  separatorKeys: number[] = [ENTER, COMMA];

  constructor(private filtersService: FiltersService) { }

  ngOnInit() {
  }

  onSearchChange (searchValue: string): void {
    //consige todas las opciones filtradas por las palabras buscadas
    this.filteredOptions = this.filtersService.filteredSubCategorias(searchValue);
    console.log(this.filteredOptions);

    //busca todas las diferentes categorias que se encontraron en esta busqueda
    this.filteredCategories = [];
    this.filteredOptions.forEach(chip =>{
      if(this.filteredCategories.length == 0 || this.filteredCategories.every(palabra => palabra != chip.categoria)){
        this.filteredCategories = this.filteredCategories.concat(chip.categoria);
      }
    });
    console.log(this.filteredCategories);
  }

  getAllCategoria(palabra: string): void{
    console.log(palabra);

    var datas = this.filtersService.filteredByCategorias(palabra);
    console.log(datas);

    datas.forEach(data => {
      if(!this.chips.includes(data)){
        this.chips.push(data);
      }
    })
/*
    if(!data){
      //Checks if the option was alredy added.
      //If it has, it ignores it 
      this.chips.push(event.option.value);
    }*/
    this.searchElement.nativeElement.value = '';
    
  }


  remove(chip: Chip):void {
    const index = this.chips.indexOf(chip);

    this.chips = this.chips.filter( data => data.id_subtipo != chip.id_subtipo);

    /*
    var removeIndex = this.chips
      .map(function(item) { return item.id_subtipo; }).indexOf(chip.id_subtipo);
    ~removeIndex && this.chips.splice(removeIndex, 1);
   
    if(index >= 0){
      this.chips.splice(index, 1);
    }*/
  }

  //Select an option from the select menu
  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    var data = this.chips.find( element => { 
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
