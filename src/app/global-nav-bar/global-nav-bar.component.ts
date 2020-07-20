import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-global-nav-bar',
  templateUrl: './global-nav-bar.component.html',
  styleUrls: ['./global-nav-bar.component.sass']
})
export class GlobalNavBarComponent implements OnInit {

  constructor(private filterService: FiltersService) { }

  @Input() idSolicitante: string;

  ngOnInit() {
    this.filterService.getNewFilters();
  }

}
