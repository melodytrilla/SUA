import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { ChartsModule } from 'ng2-charts';
import 'chart.piecelabel.js';
import { RatingBarComponent } from './rating-bar/rating-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResumenBannerComponent } from './resumen-banner/resumen-banner.component';
import {MatListModule} from '@angular/material';
import { ResumenComponent } from './resumen/resumen.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    RequestsByStateComponent,
    RatingBarComponent,
    NavbarComponent,
    ResumenBannerComponent,
    ResumenComponent,
    RequestsByDistrictComponent,
    ClaimsAndComplaintsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,  
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
