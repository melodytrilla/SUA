import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { ListadoComponent } from './listado/listado.component';
import { MapaComponent } from './mapa/mapa.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { IconoTestComponent } from './icono-test/icono-test.component';

const routes: Routes = [
  { path: '', component: ResumenComponent},
  { path: 'listado/solicitudes', component: ListadoComponent},
  { path: 'listado/:subtipo', component: ListadoComponent},// para que se usa
  { path: 'mapa/solicitudes', component: MapaComponent},
  { path: 'mapa/:subtipo', component: MapaComponent},// para que se usa
  {path: 'detalle/:nro/:anio', component: DetalleSolicitudComponent},
  {path: 'detalle', component: DetalleSolicitudComponent},//vacio
  {path: 'testIcono', component: IconoTestComponent}//lo dejo para poder testear los iconos cuando los cambien
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }