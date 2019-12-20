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
      icono: "fsua-colectivos_urbanos",
      name: "Lámpara apagada ó encendida",
      details: "840"
    },
    {
      id: 2,
      icono: "fsua-tel",
      name: "Sector apagado ó encendido",
      details: "516"
    },
    {
      id: 3,
      icono: "fsua-higiene_urbana",
      name: "Barrido y limpieza ausente ó deficiente asdasdasda dsasdasdsdasdasda sdsadsadasdasdasdasd sdasdsadasdasd",
      details: "450"
    },
  ];

  ngOnInit() {

    this.items.forEach(function(item) {
       if(item.name.length > 60){
         item.name = item.name.substr(0, 57) + "...";
         console.log("paso");
       }
    });
  }

}
