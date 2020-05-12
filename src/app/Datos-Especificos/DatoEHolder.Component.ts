import {Component, Input, ViewChild, ComponentFactoryResolver, OnInit, ViewContainerRef, ComponentRef} from '@angular/core';

import{Chip} from '../chips-container/chips-container.component'

import {DatoEDirective} from './DatoE.directive'
import {DatoEspecifico} from './DatoI.Component'
import {DatosEList} from './DatosE.List'

import {DemasiadosSubtipos} from './DatosE-Componentes/demasiadosSubtipos.Component'
import { PermisoDePoda } from './DatosE-Componentes/PermisoDePoda.Component';
import { write } from 'fs';

@Component({
    selector: 'app-dinamico-datoE',
    template:   `
                <div>
                    <ng-template Dato-place></ng-template>
                </div>
                `
})
export class DatoEHolder implements OnInit{
    @Input() subtipoArray:Chip[];
    @Input() data:any;
    @ViewChild(DatoEDirective, {static:true}) datoPlace: DatoEDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver){}

    ngOnInit(){
        this.showDatoEspecifico();
        
    }

    showDatoEspecifico(){
        const viewContainerRef = this.datoPlace.viewConteinerRef;
        viewContainerRef.clear();
        

        if(this.subtipoArray.length == 1){
            console.log(this.subtipoArray[0].descripcion);
            const componentFactory = 
            this.componentFactoryResolver.resolveComponentFactory(DatosEList.getDatoEspecifico(this.subtipoArray[0].descripcion));
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<DatoEspecifico> componentRef.instance).datos = this.data;
            
        }else{
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DemasiadosSubtipos);
            viewContainerRef.createComponent(componentFactory);
        }
    }

} 