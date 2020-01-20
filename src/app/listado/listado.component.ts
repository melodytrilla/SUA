import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { map, filter, debounceTime, distinct, tap, flatMap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';

export interface Opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {
  asc= false;
  private cache = [];
  private pageByManual$ = new BehaviorSubject(1);
  private itemHeight = 40;
  private numberOfItems = 10;
  private pageByScroll$ = fromEvent(window, "scroll").pipe(
    map(() => window.scrollY),
    tap(v => console.log(v)),
    filter(current =>
      current >= document.body.clientHeight - window.innerHeight),
    debounceTime(200),
    distinct(),
    map(y => Math.ceil(
      (y + window.innerHeight)/ (this.itemHeight * this.numberOfItems)
      )
    )
  );

  private pageByResize$ = fromEvent(window, "resize").pipe(
    debounceTime(200),
    map(_ => Math.ceil(
      (window.innerHeight + document.body.scrollTop) /
      (this.itemHeight * this.numberOfItems)
    ))
  );

  private pageToLoad$ = merge(
    this.pageByManual$,
    this.pageByResize$,
    this.pageByScroll$
  ).pipe(
    distinct(),
    filter(page => this.cache[page-1] === undefined)
  );

  loading = false;

  itemResults$ = this.pageToLoad$.pipe(
    tap(_ => this.loading = true),
    flatMap((page: number) => {
      return this.httpClient.get(
        `http://localhost:3000/items`).pipe(
        map((resp: any) => resp.results),
        tap(resp => {
          this.cache[page - 1] = resp;
          if((this.itemHeight * this.numberOfItems * page)
            < window.innerHeight) {
              this.pageByManual$.next(page + 1);
            }
        })
      )
    }),
    map(() => _.flatMap(this.cache))
  );
  

  constructor(
    private solicitudesService: SolicitudesService,
    private httpClient: HttpClient) { }

  public items: any[];

  ngOnInit() {
    this.solicitudesService.getItems().subscribe(
      data => {
        data.forEach(value =>{
          if(value.descripcion.length > 50){
            value.descripcion = value.descripcion.substr(0, 47) + "...";
          }
          if(value.descEstado.length > 55){
            value.descEstado = value.descEstado.substr(0, 52) + "...";
          }
          if(value.direccion.length > 50){
            value.direccion = value.direccion.substr(0, 47) + "...";
          }
        })
        this.items = data
      });
}

  togglePlay(){
    this.asc = !this.asc;
  }

}
