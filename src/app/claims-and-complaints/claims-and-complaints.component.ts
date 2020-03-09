import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit {

constructor(private solicitudesService: SolicitudesService) { }

public total: number = 0;
public items: any[];

  ngOnInit() {

      this.solicitudesService.getTopReclamosDenuncias().subscribe(
        data => {
          this.total = data.total;
          this.items = data.valores
        });
  }
}
