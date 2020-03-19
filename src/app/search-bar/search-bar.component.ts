import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PlacesService, Direccion } from '../places.service';

import {DateRangePicker} from '../date-range-picker/date-range-picker.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FiltroAvanzadoDialogComponent } from '../filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { BusquedaService, Busqueda, BusquedaSave } from '../busqueda.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],

})
export class SearchBarComponent implements OnInit {
  public dateMask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/, ' - ', /\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
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
  filteredDirecciones: Direccion[];
  

  //a enviar al servicio de busqueda
  private busquedaField: Busqueda
  private cantFiltros: number = 0;
  editMessage: number;

  busquedasGuardadas; 

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
    //this.busqueda.customMessage.subscribe(msg => this.cantFiltros = msg);
    console.log(this.cantFiltros)
    this.busqueda.Init();
    //console.log(this.busqueda.busquedaCompleta);
    this.busquedaField = this.busqueda.busquedaCompleta;
    this.cantFiltros = this.busqueda.getCantFiltros();

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

    this.busqueda.getBusquedas().subscribe(
      data => {
        this.busquedasGuardadas = data;
      }
    );

    //Filtrado de resultados busqueda ubicacion
    /*
    this.filteredOptions = this.form.get('ubicacion').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
    */
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
      width: '70%',
      height: '90%',
      data: {info: "filtro", busqueda: this.busquedaField},
    });
    console.log(this.cantFiltros)


    //esto es el putput del filtro avanzado aca recibo la cantidad de 
    //filtros cambiadoa cuando hago una busqueda
    dialogRef.afterClosed().subscribe(
      data=>{
        if(data != undefined){
          this.cantFiltros = data;
          console.log("Cantidad de filtros: ", this.cantFiltros);
        }
      },
      result => {
        console.log('The dialog was closed');
    });
  }

  //guarda los datos de la busqueda en el servicio
  sendInfo():void{
    this.deFormABusqueda();
    //console.log(this.form.value);
    if(this.busquedaField.Dir != null){
      if(this.busquedaField.Dir.geometry == null){
        this.busquedaField.Dir =  null;
      }
    }
    this.busqueda.Buscar(this.busquedaField);
  
  }

  //pasa los valores de el formulario a una variable a ser pasada por la busqueda
  deBusquedaAForm(busquedaLoad: Busqueda):void{
    this.form.setValue({
      "Id_solicitante" : busquedaLoad.Id_solicitante,
      "Id_solicitud" : busquedaLoad.Id_solicitud,
      "año": busquedaLoad.año,
      "ubicacion" : busquedaLoad.Dir,
      "radio" : busquedaLoad.radio,
      "date" : {
        "begin" : busquedaLoad.dateRange_begin,
        "end" : busquedaLoad.dateRange_end
      }
    })
  }

  deFormABusqueda():void{
    this.busquedaField.Id_solicitante = this.form.value.Id_solicitante;
    this.busquedaField.Id_solicitud = this.form.value.Id_solicitud;
    this.busquedaField.año = this.form.value.año;
    this.busquedaField.Dir = this.form.value.ubicacion;
    this.busquedaField.radio = this.form.value.radio;
    this.busquedaField.dateRange_begin = this.form.value.date.begin;
    this.busquedaField.dateRange_end = this.form.value.date.end;
  }

  searchUbicaciones(searchValue: string):void{
    let tempArray:any[];
    if(searchValue.length >= 4){
      this.placesService.getDirecciones(searchValue).subscribe(dir =>{
        this.filteredDirecciones = dir["features"];
      });
    }else{
      console.log("not enought");
      this.filteredDirecciones = [];
    }
  }
  displayFunction(value: Direccion):string{
    if(value != null){
      if(value.geometry){
        return value.properties.name;
      }else{
        return value.properties.name;
      }
    }
  }

  buscarguardado(guardado:BusquedaSave):void{
    //console.log(guardado);
    this.busqueda.loadBusqueda(guardado);
    this.deBusquedaAForm(guardado.busqueda);
    this.deFormABusqueda();
    this.busquedaField = guardado.busqueda;
    this.cantFiltros = guardado.cantFiltros;

  }

}
