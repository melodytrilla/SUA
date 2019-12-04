import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
  { path: '', component: ResumenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }