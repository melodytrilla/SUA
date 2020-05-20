import { Directive, ViewContainerRef, Input } from '@angular/core';
import { DatoEspecifico } from './DatoI.Component';

@Directive({
    selector:'[Dato-place]',
})

export class DatoEDirective{
    constructor(public viewConteinerRef: ViewContainerRef){}
}