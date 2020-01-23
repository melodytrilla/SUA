import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { MatListModule } from '@angular/material';
import { ResumenComponent } from './resumen/resumen.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChipsContainerComponent } from './chips-container/chips-container.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { QueriesAndFormalitiesComponent } from './queries-and-formalities/queries-and-formalities.component';
import { FiltroAvanzadoDialogComponent } from './filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { RequestsByOriginComponent } from './requests-by-origin/requests-by-origin.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Top10CategoriesComponent } from './top10-categories/top10-categories.component';
import { Top10NeighborhoodsComponent } from './top10-neighborhoods/top10-neighborhoods.component';
import { GlobalNavBarComponent } from './global-nav-bar/global-nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListadoComponent } from './listado/listado.component';
import { MapaComponent } from './mapa/mapa.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import * as _ from 'lodash';
import { SideBarLoginComponent } from './side-bar-login/side-bar-login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MapComponent } from './map/map.component';
import { BusquedaService } from './busqueda.service'


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
    FiltroAvanzadoDialogComponent,
    RequestsByOriginComponent,
    Top10CategoriesComponent,
    Top10NeighborhoodsComponent,
    GlobalNavBarComponent,
    CarouselComponent,
    GlobalNavBarComponent,
    EstadisticasComponent,
    ListadoComponent,
    MapaComponent,
    SideBarLoginComponent,
    MapComponent
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
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ScrollingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
  ],
  entryComponents: [DateRangePicker, FiltroAvanzadoDialogComponent],
  providers: [{ provide: LOCALE_ID, useValue: "es-AR" }, BusquedaService],
  bootstrap: [AppComponent],

})
export class AppModule { }
