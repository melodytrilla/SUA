import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claims-and-complaints',
  templateUrl: './claims-and-complaints.component.html',
  styleUrls: ['./claims-and-complaints.component.sass']
})
export class ClaimsAndComplaintsComponent implements OnInit {

constructor() { }

public items: Array<any> = [
    {
      id: 1,
      icono: "fsua-alumbrado_publico",
      name: "Lámpara apagada ó encendida",
      details: "840"
    },
    {
      id: 2,
      icono: "fsua-alumbrado_publico",
      name: "Sector apagado ó encendido",
      details: "516"
    },
    {
      id: 3,
      icono: "fsua-higiene_urbana",
      name: "Barrido y limpieza ausente ó deficiente",
      details: "450"
    },
  ];

  ngOnInit() {
  }

}
