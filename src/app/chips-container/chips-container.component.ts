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

  savedChips :Chip[] = [];

  //Chips config
  removable = true;
  selectable = true;
  addOnBlur = true;
  separatorKeys: number[] = [ENTER, COMMA];

  //interaccion con la busqueda
  @Input() chipsAnteriores: Chip[];

  constructor(private filtersService: FiltersService,
              private busquedaService: BusquedaService) { }

  //recupera los chips guardados en la session si los hay
  ngOnInit() {
    if(this.busquedaService.busquedaCompleta.advSearch != null){
      this.savedChips = JSON.parse(JSON.stringify(this.busquedaService.busquedaCompleta.advSearch.clasificacion_subtipo));
    }
    this.chips = JSON.parse(JSON.stringify(this.savedChips));
  }

  onSearchChange (searchValue: string): void {
    if(searchValue.length >= 4){
      //consige todas las opciones filtradas por las palabras buscadas
      this.filteredOptions = this.filtersService.filteredSubCategorias(searchValue);

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

    var datas = this.filtersService.filteredByCategorias(palabra);

    datas.forEach(data => {
      if(!this.chips.includes(data)){
        this.chips.push(data);
      }
    })
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
  }

  removeAll():void{
    this.chips = [];
    this.filteredOptions = [];
    this.filteredCategories = [];
  }

  //Select an option from the select menu
  selected(chip: Chip): void {
    var data = this.chips.find( element => { 
      return element.descripcion === chip.descripcion;});
      
    if(!data){
      //chequea si la opcion fue agregada
      //si no, lo ignora 
      this.chips.push(chip);
    }
    this.searchElement.nativeElement.value = '';

  }

  showSearch() : void {
    this.searchBoxVisible = !this.searchBoxVisible;
    // despues de que se cambiio el bool se enfoca en la barra de busqueda
    setTimeout(()=>{ 
      this.searchElement.nativeElement.focus();
    },0);  
  }

  //se utiliza para enviar los chips al elemento padre
  guardarChips(): Chip[]{
    return this.chips;
  }

  chipsLength():number{
    return this.chips.length;
  }
}
