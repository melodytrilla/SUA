import { Component, OnInit, Input } from '@angular/core';
import { SolicitudesService } from '../solicitudes.service';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent{

@Input() data: any;
@Input() title: string;
@Input() loading: Boolean;

constructor() { }

}
