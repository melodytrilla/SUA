import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, Inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of} from 'rxjs';
import { FiltersService } from '../filters.service';
import { startWith, map, filter, reduce, mergeMap, groupBy, zip, toArray } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger} from '@angular/material';
import { BusquedaService } from '../busqueda.service';

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

  //interaccion con la busqueda
  @Input() chipsAnteriores: Chip[];

  constructor(private filtersService: FiltersService,
              private busquedaService: BusquedaService) { }

  //recupera los chisp guardados en la session si los hay
  ngOnInit() {
    if(this.busquedaService.busquedaCompleta.advSearch != null){
      this.chips = this.busquedaService.busquedaCompleta.advSearch.clasificacion_subtipo;
    }
  }

  onSearchChange (searchValue: string): void {
    if(searchValue.length >= 4){
      //consige todas las opciones filtradas por las palabras buscadas
      this.filteredOptions = this.filtersService.filteredSubCategorias(searchValue);
      //console.log(this.filteredOptions);

      //busca todas las diferentes categorias que se encontraron en esta busqueda
      this.filteredCategories = [];
      this.filteredOptions.forEach(chip =>{
        if(this.filteredCategories.length == 0 || this.filteredCategories.every(palabra => palabra != chip.categoria)){
          this.filteredCategories = this.filteredCategories.concat(chip.categoria);
        }
      });
      //console.log(this.filteredCategories);
    }else{
      this.filteredOptions = [];
      this.filteredCategories = [];
    }

  }

  //al seleccionar una categoria se le debuelve todos las subcategorias que pertenescan a ella
  getAllCategoria(palabra: string): void{
    //console.log(palabra);

    var datas = this.filtersService.filteredByCategorias(palabra);
    //console.log(datas);

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

  //para remover chips 
  remove(chip: Chip):void {
    const index = this.chips.indexOf(chip);

    this.chips = this.chips.filter( data => data.id_subtipo != chip.id_subtipo);

    if(this.chips.length == 0){
      this.filteredOptions = [];
      this.filteredCategories = [];
    }
    /*
    var removeIndex = this.chips
      .map(function(item) { return item.id_subtipo; }).indexOf(chip.id_subtipo);
    ~removeIndex && this.chips.splice(removeIndex, 1);
   
    if(index >= 0){
      this.chips.splice(index, 1);
    }*/
  }

  //Select an option from the select menu
  selected(chip: Chip): void {
    /*
    const value = event.option.viewValue;
    */
    var data = this.chips.find( element => { 
      return element.descripcion === chip.descripcion;});
      
    if(!data){
      //Checks if the option was alredy added.
      //If it has, it ignores it 
      this.chips.push(chip);
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

  //se utiliza para enviar los chips al elemento padre
  guardarChips(): Chip[]{
    //this.eviarChips.emit(this.chips);
    return this.chips;
  }

  chipsLength():number{
    return this.chips.length;
  }
}
