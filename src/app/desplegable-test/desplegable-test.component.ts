import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatExpansionPanel } from '@angular/material';
import { SolicitudesService, Vecinal } from '../solicitudes.service';


@Component({
  selector: 'app-desplegable-test',
  templateUrl: './desplegable-test.component.html',
  styleUrls: ['./desplegable-test.component.sass']
})



export class DesplegableTestComponent implements OnInit {

  areas:string[] = [];

  readonly default_descripcion: string = "esto es un descripcion temporal";

  constructor(private solicitudesService: SolicitudesService) { }

  public descripcion: string = this.default_descripcion;
  inputDescripcion="";

  

  //----------------------------------------------------
  @ViewChild('search', {static: false}) searchElement: ElementRef;

  filteredDistritos: string[] = [];
  filteredVecinales: Vecinal[] = [];

  chipVecinales: Vecinal[] = [];

  separatorKeys: number[] = [ENTER, COMMA];




  ngOnInit() {
    this.solicitudesService.getAllVecinales();
      this.ActualizarDesc()

  }
  ActualizarDesc(){
    this.inputDescripcion = this.InputADescripcion();

    if(this.chipVecinales.length > 0){
      document.getElementById("principalPanel").style.animationName = "hasData"
      document.getElementById("principalPanel").style.webkitAnimationName = "hasData"
      document.getElementById("principalPanel").style.animationDirection = "normal";
      document.getElementById("principalPanel").style.webkitAnimationDirection = "normal";

      this.descripcion = this.inputDescripcion;
    }else{
      if( document.getElementById("principalPanel").style.animationName == "hasData"){
        document.getElementById("principalPanel").style.animationDirection = "reverse";
        document.getElementById("principalPanel").style.webkitAnimationDirection = "reverse";
      }
      this.descripcion = "no se busca por esta categoria.";
    }
  }

  InputADescripcion(): string{
    let desc:string = "se filtra por " + this.chipVecinales.length + " distritos";


    return desc;
  }

  onChange(searchValue: string):void{
    if(searchValue.length > 2){

      //this.filteredVecinales = this.solicitudesService.getVecinales();
      //this.filteredDistritos = this.solicitudesService.getDistritos();

      this.filteredVecinales = this.solicitudesService.filteredVecinalesSearch(searchValue);
      this.filteredDistritos = this.solicitudesService.filterdeDistritosSearch(searchValue, this.filteredVecinales);


    }else{
      this.filteredDistritos = [];
      this.filteredVecinales = [];
    }
  }

  remove(vecinal: Vecinal):void{
    this.chipVecinales = this.chipVecinales.filter(valor => valor.nombre != vecinal.nombre);
  }

  selecVecinal( vecinal:Vecinal):void{
    if(this.chipVecinales.every(value => value.nombre != vecinal.nombre)){
      this.chipVecinales.push(vecinal);
    }

    this.searchElement.nativeElement.value = "";
    this.filteredDistritos = [];
    this.filteredVecinales = [];

  }

  selecDistrito(distrito: string):void{
    let temp = this.solicitudesService.getVecinales().filter(vecinal => vecinal.distrito == distrito);

    temp.forEach(vecinal => {
      if(this.chipVecinales.every(chip => chip.nombre != vecinal.nombre)){
        this.chipVecinales.push(vecinal);
      }
    });


    this.searchElement.nativeElement.value = "";
    this.filteredDistritos = [];
    this.filteredVecinales = [];

  }
/*
  updateAutocomplete(value: string):void{
    this.areas = [];
    this.solicitudesService.getAreas().subscribe(result => 
      this.areas = result.filter((area) => {
      return (area.toLowerCase()).includes(value);
    }))
  }*/
}
