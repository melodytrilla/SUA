import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit {

constructor(private solicitudesService: SolicitudesService,
            private router: Router) { }

public total: number = 0;
public items: any[];

  ngOnInit() {

      this.solicitudesService.getTopReclamosDenuncias().subscribe(
        data => {
          this.total = data.total;
          data.valores.forEach(value =>{
            if(value.name.length > 32){
              value.name = value.name.substr(0, 29) + "...";
            }
          })
          this.items = data.valores
        });
  }
  sendToList(a){
    let url= `/listado/${a}`;
    this.router.navigateByUrl(url)
  }
  sendToMap(a){
    let url= `/mapa/${a}`;
    this.router.navigateByUrl(url)
  }

}
