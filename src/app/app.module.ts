import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

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
import { MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChipsContainerComponent } from './chips-container/chips-container.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { DateRangePicker} from './date-range-picker/date-range-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { QueriesAndFormalitiesComponent } from './queries-and-formalities/queries-and-formalities.component';
import { GlobalNavBarComponent } from './global-nav-bar/global-nav-bar.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListadoComponent } from './listado/listado.component';
import { MapaComponent } from './mapa/mapa.component';

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
    ChipsContainerComponent,
    SearchBarComponent,
    DateRangePicker,
    QueriesAndFormalitiesComponent,
    GlobalNavBarComponent,
    EstadisticasComponent,
    ListadoComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    FlexLayoutModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule, MatAutocompleteModule,
    LayoutModule,
    TextMaskModule,
    SatDatepickerModule, SatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [DateRangePicker],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
