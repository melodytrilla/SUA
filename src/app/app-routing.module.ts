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
  { path: 'listado', component: ListadoComponent},
  { path: 'mapa', component: MapaComponent},
  {path: 'sidenavTest', component: SideBarLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }