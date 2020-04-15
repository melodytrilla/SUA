import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chip, ChipsContainerComponent } from './chips-container/chips-container.component';
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  otherURL = "http://localhost:4000"
  constructor(private httpClient: HttpClient) { }

  private _todasSubcategorias: Chip[] = [];

  private _savedChips: Chip[] = [];

  //Obtiene los datos del Json
  getNewFilters(): void{
    if (this._todasSubcategorias.length == 0){
      this.httpClient.get<Chip[]>(
        `${this.otherURL}/Categorias`).subscribe(
          categorias => {
            this._todasSubcategorias = this._todasSubcategorias.concat(categorias);
        }
      );
    }
  }

  get todasSubcategorias(): Chip[]{
    return this._todasSubcategorias;
  }

  filteredByCategorias( value: string):Chip[]{
    return this.todasSubcategorias.filter(chip => chip.categoria == value)
  }

  //funcion que devuelve una lista de chips filtrados 
  filteredSubCategorias( value: string):Chip[]{
    return this.todasSubcategorias.filter(chip => this.filterfunction(chip, value));
  }

  //funcion para filtrar entre las categorias busca por categoria sub categoria tipo y etiquetas
  private filterfunction( chip: Chip, value: string):boolean{
    let valuesArray = value.split(" ");
    valuesArray = valuesArray.filter( palabra => palabra != "");
 
    if(valuesArray.length == 0){
      return true;
    }

    for (let index = 0; index < valuesArray.length; index++) {
      if(chip.etiquetas.toLocaleLowerCase().includes(valuesArray[index].toLocaleLowerCase()) || chip.descripcion_ext.toLocaleLowerCase().includes(valuesArray[index].toLocaleLowerCase())){
        return true;
      }
    }
    return false;
    
  }

  //interaccion con los cips guardados
  get savedChips(): Chip[]{
    return this._savedChips;
  }

  set savedChips( newChips: Chip[]){
    this._savedChips = newChips;
  }
}
