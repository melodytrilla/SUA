import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ResumenComponent } from './resumen/resumen.component';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { QueriesAndFormalitiesComponent } from './queries-and-formalities/queries-and-formalities.component';
import { RequestsByOriginComponent } from './requests-by-origin/requests-by-origin.component';
import { Top10CategoriesComponent } from './top10-categories/top10-categories.component';
import { Top10NeighborhoodsComponent } from './top10-neighborhoods/top10-neighborhoods.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ListadoComponent } from './listado/listado.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MapaComponent } from './mapa/mapa.component';
import { SideBarLoginComponent } from './side-bar-login/side-bar-login.component';
import { MapComponent } from './map/map.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { DesplegableTestComponent } from './desplegable-test/desplegable-test.component';
import { IconoTestComponent } from './icono-test/icono-test.component';

const routes: Routes = [
  { path: '', component: ResumenComponent},
  { path: 'solicitudesPorEstado', component: RequestsByStateComponent},
  { path: 'solicitudesPorDistrito', component: RequestsByDistrictComponent},
  { path: 'reclamosYDenuncias', component: ClaimsAndComplaintsComponent},
  { path: 'consultasYTramites', component: QueriesAndFormalitiesComponent},
  { path: 'solicitudesPorOrigen', component: RequestsByOriginComponent},
  { path: 'top10categorias', component: Top10CategoriesComponent},
  { path: 'top10vecinales', component: Top10NeighborhoodsComponent},
  { path: 'carousel', component: CarouselComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
  { path: 'listado/solicitudes', component: ListadoComponent},
  { path: 'listado/:subtipo', component: ListadoComponent},
  { path: 'mapa/solicitudes', component: MapaComponent},
  { path: 'mapa/:subtipo', component: MapaComponent},
  {path: 'sidenavTest', component: SideBarLoginComponent},
  {path: 'map', component: MapComponent},
  {path: 'detalle/:nro/:anio', component: DetalleSolicitudComponent},
  {path:'busquedaTesting', component: DesplegableTestComponent},
  {path: 'detalle', component: DetalleSolicitudComponent},
  {path: 'testIcono', component: IconoTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }