import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queries-and-formalities',
  templateUrl: './queries-and-formalities.component.html',
  styleUrls: ['./queries-and-formalities.component.sass']
})
export class QueriesAndFormalitiesComponent implements OnInit {

  constructor() { }

  public items: Array<any> = [
    {
      id: 1,
      icono: "fsua-colectivos_urbanos",
      name: "Consulta TUP",
      details: "5948"
    },
    {
      id: 2,
      icono: "fsua-tel",
      name: "Información sobre temas ajenos al 147",
      details: "358"
    },
    {
      id: 3,
      icono: "fsua-higiene_urbana",
      name: "Solicitud de información de higiene urbana",
      details: "72"
    },
  ];

  ngOnInit() {
  }

}
