import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit {

constructor(private solicitudesService: SolicitudesService) { }

public items: any[];

  ngOnInit() {

      this.solicitudesService.getTopReclamosDenuncias().subscribe(
        data => {
          data.forEach(value =>{
            if(value.name.length > 60){
              value.name = value.name.substr(0, 57) + "...";
            }
          })
          this.items = data
        });
  }

}
