import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {

  constructor() { }

  public items: Array<any> = [
    {
      id: 1,
      nroSolicitud: "313127-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 01:20",
      descripcion: "Semáforo apagado o intermitente",
      direccion: "OROÑO NICASIO Y URIBURU PTE. JOSE",
      tiempo: "Hace 2 días",
      estado: "En curso",
      descEstado: "Oroño - Uriburu semáforo intermitente",

    },
    {
      id: 2,
      nroSolicitud: "313127-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 01:20",
      descripcion: "Semáforo apagado o intermitente",
      direccion: "OROÑO NICASIO Y URIBURU PTE. JOSE",
      tiempo: "Hace 2 días",
      estado: "En curso",
      descEstado: "Oroño - Uriburu semáforo intermitente",
    },
    {
      id: 3,
      nroSolicitud: "313127-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 01:20",
      descripcion: "Semáforo apagado o intermitente",
      direccion: "OROÑO NICASIO Y URIBURU PTE. JOSE",
      tiempo: "Hace 2 días",
      estado: "En curso",
      descEstado: "Oroño - Uriburu semáforo intermitente",
    },
  ];

  ngOnInit() {
  }

}
