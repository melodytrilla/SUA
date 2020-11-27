import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ResumenComponent } from './resumen/resumen.component';
//import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
//import { RequestsByOriginComponent } from './requests-by-origin/requests-by-origin.component';
//import { Top10CategoriesComponent } from './top10-categories/top10-categories.component';
//import { Top10NeighborhoodsComponent } from './top10-neighborhoods/top10-neighborhoods.component';
//import { CarouselComponent } from './carousel/carousel.component';
import { ListadoComponent } from './listado/listado.component';
//import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MapaComponent } from './mapa/mapa.component';
//import { SideBarLoginComponent } from './side-bar-login/side-bar-login.component';
//import { MapComponent } from './map/map.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
//import { DesplegableTestComponent } from './desplegable-test/desplegable-test.component';
import { IconoTestComponent } from './icono-test/icono-test.component';

const routes: Routes = [
  { path: '', component: ResumenComponent},
  //{ path: 'solicitudesPorEstado', component: RequestsByStateComponent},//borrar
  //{ path: 'solicitudesPorDistrito', component: RequestsByDistrictComponent},//borrar
  //{ path: 'solicitudesPorOrigen', component: RequestsByOriginComponent},//borrar
  //{ path: 'top10categorias', component: Top10CategoriesComponent},//borrar
  //{ path: 'top10vecinales', component: Top10NeighborhoodsComponent},//borrar
  //{ path: 'carousel', component: CarouselComponent},//borrar
  //{ path: 'estadisticas', component: EstadisticasComponent},//esta vacia
  { path: 'listado/solicitudes', component: ListadoComponent},
  { path: 'listado/:subtipo', component: ListadoComponent},// para que se usa
  { path: 'mapa/solicitudes', component: MapaComponent},
  { path: 'mapa/:subtipo', component: MapaComponent},// para que se usa
  //{path: 'sidenavTest', component: SideBarLoginComponent},//borrar
  //{path: 'map', component: MapComponent},//borrar
  {path: 'detalle/:nro/:anio', component: DetalleSolicitudComponent},
  //{path:'busquedaTesting', component: DesplegableTestComponent},//borrar
  {path: 'detalle', component: DetalleSolicitudComponent},//vacio
  {path: 'testIcono', component: IconoTestComponent}//lo dejo para poder testear los iconos cuando los cambien
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }