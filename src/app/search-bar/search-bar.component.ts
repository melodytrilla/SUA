import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PlacesService } from '../places.service';


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
  places;
  filteredOptions: Observable<string[]>;
  
  constructor(
    private formBuilder: FormBuilder, 
    private placesService: PlacesService
    ) {
  }

  inlineRangeChange($event) {
    this.inlineRange = $event;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: {
        //Aca se puede configurar el rango predeterminado en el cual inicializar el form
        begin: new Date(2018, 7, 5), 
        end: new Date(2018, 7, 25)
      },
      ubicacion: '',
    });

    /**Para disminuir la cantidad de request a la API en el filtrado 
     * si los resultados son pocos, conviene buscar todos los resultados
     * una sola vez y luego filtrarlos en memoria.
     * Si los resultados son muchos, conviene hacer una request cada vez que se cambia
     * el texto en elcontrol de usuario y enviar el parametro al endpoint
     */
    this.places = this.placesService.getPlaces();

    //Filtrado de resultados busqueda ubicacion
    this.filteredOptions = this.form.get('ubicacion').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.places
      .filter(option => option.toLowerCase().includes(filterValue));
  }
}
