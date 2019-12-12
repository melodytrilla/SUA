import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ResumenComponent } from './resumen/resumen.component';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { QueriesAndFormalitiesComponent } from './queries-and-formalities/queries-and-formalities.component';

const routes: Routes = [
  { path: '', component: ResumenComponent},
  { path: 'solicitudesPorEstado', component: RequestsByStateComponent},
  { path: 'solicitudesPorDistrito', component: RequestsByDistrictComponent},
  { path: 'reclamosYDenuncias', component: ClaimsAndComplaintsComponent},
  { path: 'consultasYTramites', component: QueriesAndFormalitiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }