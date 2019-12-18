import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ResumenComponent } from './resumen/resumen.component';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { QueriesAndFormalitiesComponent } from './queries-and-formalities/queries-and-formalities.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListadoComponent } from './listado/listado.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: ResumenComponent},
  { path: 'solicitudesPorEstado', component: RequestsByStateComponent},
  { path: 'solicitudesPorDistrito', component: RequestsByDistrictComponent},
  { path: 'reclamosYDenuncias', component: ClaimsAndComplaintsComponent},
  { path: 'consultasYTramites', component: QueriesAndFormalitiesComponent},
  { path: 'estadisticas', component: EstadisticasComponent},
  { path: 'listado', component:ListadoComponent},
  { path: 'mapa', component:MapaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }