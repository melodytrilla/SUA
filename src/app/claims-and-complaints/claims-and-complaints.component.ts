import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit {

constructor(private solicitudesService: SolicitudesService) { }

public items;

  ngOnInit() {

    this.items = this.solicitudesService.getTopReclamosDenuncias().subscribe(
      data => { this.items= data; });

    this.items.forEach(function(item) {
       if(item.name.length > 60){
         item.name = item.name.substr(0, 57) + "...";
       }
    });
  }

}
