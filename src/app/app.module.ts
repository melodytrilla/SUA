import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ChartsModule } from 'ng2-charts';
import { RatingBarComponent } from './rating-bar/rating-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResumenBannerComponent } from './resumen-banner/resumen-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsByStateComponent,
    RatingBarComponent,
    NavbarComponent,
    ResumenBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
