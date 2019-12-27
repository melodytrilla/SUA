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
      nroSolicitud: "313119-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 00:14",
      iconoDesc: "fsua-colectivos_urbanos",
      descripcion: "Consulta TUP",
      direccion: " ",
      tiempo: "Hace más de un mes",
      iconoOpinada: "",
      estado: "Resuelto",
      descEstado: "La consulta fue respondida por el operador",
      cantTel: "1",
    },
    {
      id: 2,
      nroSolicitud: "313120-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 00:22",
      iconoDesc: "fsua-convivencia_ciudadana",
      descripcion: "Ruido molesto en la vía pública",
      direccion: "GUEMES MARTIN MIGUEL JUAN 2520",
      tiempo: "Hace más de un mes",
      iconoOpinada: "fsua-malo",
      estado: "Resuelto",
      descEstado: "No se pudo abordar el reclamo, de persistir ...",
      cantInterv: "1",
      tiempoInterv: "Hace más de un mes",
      cantMap: "5",
      tiempoMap: "Hace más de un mes",
      cantTel: "1",
      cantPerfil: "1",
    },
    {
      id: 3,
      nroSolicitud: "313121-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 00:29",
      iconoDesc: "fsua-alumbrado_publico",
      descripcion: "Sector apagado o encendido",
      direccion: "DE LA QUINTANA HILARION 100",
      tiempo: "Hace más de un mes",
      estado: "Resuelto",
      descEstado: "No se constata infracción por razones operativas",
      cantLogo: "1",
      cantPerfil: "1",
    },
    {
      id: 4,
      nroSolicitud: "313124-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 01:15",
      iconoDesc: "fsua-convivencia_ciudadana",
      descripcion: "Persona en situación de calle",
      direccion: "CORRIENTES 788",
      tiempo: "Hace más de un mes",
      iconoOpinada: "",
      estado: "Resuelto",
      descEstado: "Se constata a un masculino, durmiendo en la acera...",
      cantMap: 1,
      tiempoMap: "Hace más de un mes",
      cantTel: 1,
      cantPerfil: 1
    },
    {
      id: 5,
      nroSolicitud: "313126-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 01:20",
      iconoDesc: "fsua-calzadas_y_veredas",
      descripcion: "Manten. de calles abovedado y movim...",
      direccion: "OROÑO NICASIO 1283",
      tiempo: "Hace más de un mes",
      iconoOpinada: "",
      estado: "En curso",
      descEstado: "Veredas rotas, frente a edificio",
      cantTel: 1,
      cantPerfil: 1,
    },
    {
      id: 6,
      nroSolicitud: "313127-2019",
      imagen: "assets/img.png",
      fecha: "01/05/2019 01:20",
      iconoDesc: "fsua-semáforos",
      descripcion: "Semáforo apagado o intermitente",
      direccion: "OROÑO NICASIO Y URIBURU PTE. JOSE",
      tiempo: "Hace 2 días",
      iconoOpinada: "",
      estado: "En curso",
      descEstado: "Oroño- Uriburu semáforo intermitente",
      cantTel: "3",
      cantLogo: 1,
      cantMap: 6,
      cantInterv: 1,
      cantPerfil: 2,
      cantRiesgo: 2,
      tiempoInterv: "Hace 3 días",
      tiempoMap: "Hace 10 días"
    },
    
  ];

  ngOnInit() {
  }

}
