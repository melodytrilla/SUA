import {Component, Input, ViewChild, ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';

import{Chip} from '../chips-container/chips-container.component'

import {DatoEDirective} from './DatoE.directive'
import {DatoEspecifico} from './DatoI.Component'

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
export class DatoEHolder implements OnInit, OnDestroy{
    @Input() subtipoArray:Chip[];
    @Input() data:any;
    @ViewChild(DatoEDirective, {static:true}) datoPlace: DatoEDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver){}
    
    ngOnInit(){
        const viewContainerRef = this.datoPlace.viewConteinerRef;
        viewContainerRef.clear();
        
        if(this.subtipoArray.length == 1){
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PermisoDePoda);
            viewContainerRef.createComponent(componentFactory);
        }else{
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DemasiadosSubtipos);
            viewContainerRef.createComponent(componentFactory);
        }
        
    }

    ngOnDestroy(){

    }
} 