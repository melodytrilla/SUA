import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector:'[Dato-place]',
})

export class DatoEDirective{
    constructor(public viewConteinerRef: ViewContainerRef){}
}