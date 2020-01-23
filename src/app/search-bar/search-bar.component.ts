import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PlacesService } from '../places.service';

import {DateRangePicker} from '../date-range-picker/date-range-picker.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FiltroAvanzadoDialogComponent } from '../filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { BusquedaService, Busqueda } from '../busqueda.service';

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

  //Datepicker props
  inlineRange;
  rangesFooter = DateRangePicker;

  //Locations filtering 
  places;
  filteredOptions: Observable<string[]>;
  

  //a enviar al servicio de busqueda
  private busquedaField: Busqueda

  constructor(
    private formBuilder: FormBuilder, 
    private placesService: PlacesService,
    public dialog: MatDialog,
    private busqueda: BusquedaService) {  }

  inlineRangeChange($event) {
    this.inlineRange = $event;
  }
  //se llama al servicio para inicializarlo y se inicializan y linkean todos los valores de el formulario
  ngOnInit() {
    this.busqueda.Init();
    //console.log(this.busqueda.busquedaCompleta);
    this.busquedaField = this.busqueda.busquedaCompleta;

    this.form = this.formBuilder.group({
      date: {
        //Aca se puede configurar el rango predeterminado en el cual inicializar el form
        begin: this.busquedaField.dateRange_begin/*new Date(2018, 7, 5)*/, 
        end: this.busquedaField.dateRange_end//new Date(2018, 7, 25)
      },
      Id_solicitud: this.busquedaField.Id_solicitud,
      año: this.busquedaField.año,
      ubicacion: this.busquedaField.Dir,
      radio: this.busquedaField.radio,
      Id_solicitante: this.busquedaField.Id_solicitante  
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


  //Filtro avanzado dialog 
  //se utiliza para abrir la ventana de busqueda avanzada
  openDialog(): void {
    this.deFormABusqueda();
    const dialogRef = this.dialog.open(FiltroAvanzadoDialogComponent, {
      width: '1000px',
      data: {info: "filtro", busqueda: this.busquedaField}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //guarda los datos de la busqueda en el servicio
  sendInfo():void{
    this.deFormABusqueda()
    //console.log(this.form.value);
    //console.log(this.busquedaField);
    this.busqueda.Buscar(this.busquedaField);
  
  }

  //pasa los valores de el formulario a una variable a ser pasada por la busqueda
  deFormABusqueda():void{
    this.busquedaField.Id_solicitante = this.form.value.Id_solicitante;
    this.busquedaField.Id_solicitud = this.form.value.Id_solicitud;
    this.busquedaField.año = this.form.value.año;
    this.busquedaField.Dir = this.form.value.ubicacion;
    this.busquedaField.radio = this.form.value.radio;
    this.busquedaField.dateRange_begin = this.form.value.date.begin;
    this.busquedaField.dateRange_end = this.form.value.date.end;
  }

}
