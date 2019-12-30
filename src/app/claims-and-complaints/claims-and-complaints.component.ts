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
      details: "1840"
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
    {
      id: 4,
      icono: "fsua-bicis_publicas",
      name: "Puesto de bicicletas vacio",
      details: "289"
    },
    {
      id: 5,
      icono: "fsua-semaforos",
      name: "Semaforo roto",
      details: "100"
    },
  ];

  ngOnInit() {

    this.items.forEach(function(item) {
       if(item.name.length > 60){
         item.name = item.name.substr(0, 57) + "...";
       }
    });
  }

}
