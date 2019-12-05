import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.sass']
})
export class ResumenComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 4, rows: 1 },
          { title: 'Card 5', cols: 2, rows: 2 },
          { title: 'Card 6', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Card 5', cols: 2, rows: 1 },
        { title: 'Card 6', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
