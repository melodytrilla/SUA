import {Component, Input, ViewChild, ComponentFactoryResolver, OnInit, ViewContainerRef, ComponentRef} from '@angular/core';

import{Chip} from '../chips-container/chips-container.component'

import {DatoEDirective} from './DatoE.directive'
import {DatoEspecifico} from './DatoI.Component'
import {DatosEList} from './DatosE.List'

import {DemasiadosSubtipos} from './DatosE-Componentes/demasiadosSubtipos.Component'
import { PermisoDePoda } from './DatosE-Componentes/PermisoDePoda.Component';
import { write } from 'fs';
import { DatoEBase } from './DatoEBase.Component';

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

    componentRef:any;

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
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            (<DatoEspecifico> this.componentRef.instance).datos = this.data;
            console.log(this.data);

        }else{
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DemasiadosSubtipos);
            this.componentRef = viewContainerRef.createComponent(componentFactory);
        }
    }

    public getDatosFromComponent(): any{
        return (<DatoEBase>this.componentRef.instance).getDatos();
    }

} 