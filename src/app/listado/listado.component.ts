import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { SolicitudesItemsService } from '../solicitudes-items.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as moment from 'moment';
import 'moment/locale/es';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';

export interface Opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoComponent implements AfterViewInit {
  asc = false;
  toppings = new FormControl();
  list: {subtipo: string};

  constructor(public api: SolicitudesItemsService,
              private rutaActiva: ActivatedRoute,
              private router: Router) { }

  public items: any[];
  public ar: any[] = [];

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;
  
  ngAfterViewInit() {
    
  }

  loading = false;
  ngOnInit() {
    this.loading = true;
      this.api.getSolicitudes().subscribe(
        data => {
          data.forEach(value => {
              value.tiempo = this.calculateTime(value.fecha_hora_estado);
              value.tiempoInterv = this.calculateTime(value.fecha_hora_intervencion);
              value.tiempoMap = this.calculateTime(value.fecha_hora_asignacion);
          })
          this.items = data;
          this.loading = false;
        });
  }
  
  //TODO: ver. Esto es una forma incorrecta de redirigir ya que se refresca toda la pagina y no el componente.
  sendto(a, b){
    let url= `/detalle/${a}/${b}`;
    this.router.navigateByUrl(url)
  }

  calculateTime(date: Date){
    return moment(date,"DD/MM/YYYY HH:mm:ss").fromNow();
  }

  togglePlay() {
    this.asc = !this.asc;
  }
  
  nextBatch(currIndex: number, items: any[]) {
    const start = this.viewPort.getRenderedRange().start;
    const end = this.viewPort.getRenderedRange().end;
    const total = this.viewPort.getDataLength();
  }

  trackByIdx(i: number) {
    return i;
  }
}
