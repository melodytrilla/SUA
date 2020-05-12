import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';

//Estilos 
import { MaterialModule } from './material.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Utiles
import { NgModule, LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { SortPipe } from './sort.pipe';

import { TextMaskModule } from 'angular2-text-mask';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { MapComponent } from './map/map.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

//Componentes 
import { RequestsByStateComponent } from './requests-by-state/requests-by-state.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResumenBannerComponent } from './resumen-banner/resumen-banner.component';
import { ResumenComponent } from './resumen/resumen.component';
import { RequestsByDistrictComponent } from './requests-by-district/requests-by-district.component';
import { ClaimsAndComplaintsComponent } from './claims-and-complaints/claims-and-complaints.component';
import { ChipsContainerComponent } from './chips-container/chips-container.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FiltroAvanzadoDialogComponent } from './filtro-avanzado-dialog/filtro-avanzado-dialog.component';
import { RequestsByOriginComponent } from './requests-by-origin/requests-by-origin.component';
import { Top10CategoriesComponent } from './top10-categories/top10-categories.component';
import { Top10NeighborhoodsComponent } from './top10-neighborhoods/top10-neighborhoods.component';
import { GlobalNavBarComponent } from './global-nav-bar/global-nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListadoComponent } from './listado/listado.component';
import { MapaComponent } from './mapa/mapa.component';
import { SideBarLoginComponent } from './side-bar-login/side-bar-login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BusquedaService } from './busqueda.service';
import { CartaInfoComponent } from './carta-info/carta-info.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { DesplegableTestComponent } from './desplegable-test/desplegable-test.component';
import { IconoTestComponent } from './icono-test/icono-test.component';
import { DownloadService } from './download.service';
import { registerLocaleData } from '@angular/common';
import { VerMasComponent } from './ver-mas/ver-mas.component';
import { OpinadasComponent } from './opinadas/opinadas.component';
import { DatoEHolder } from './Datos-Especificos/DatoEHolder.Component';
import {DatoEDirective} from './Datos-Especificos/DatoE.directive';
import {PermisoDePoda} from './Datos-Especificos/DatosE-Componentes/PermisoDePoda.Component';
import {DemasiadosSubtipos} from './Datos-Especificos/DatosE-Componentes/demasiadosSubtipos.Component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsByStateComponent,
    NavbarComponent,
    ResumenBannerComponent,
    ResumenComponent,
    RequestsByDistrictComponent,
    ClaimsAndComplaintsComponent,
    ChipsContainerComponent,
    SearchBarComponent,
    DateRangePicker,
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
    CartaInfoComponent,
    MapComponent,
    DetalleSolicitudComponent,
    DesplegableTestComponent,
    IconoTestComponent,
    VerMasComponent,
    SortPipe,
    OpinadasComponent,
    DatoEHolder,
    DatoEDirective,
    PermisoDePoda,
    DemasiadosSubtipos
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    LayoutModule,
    FlexLayoutModule,
    LayoutModule,
    TextMaskModule,
    SatDatepickerModule, SatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ScrollingModule,
    InfiniteScrollModule,
    NgxSpinnerModule, NgxContentLoadingModule,
  ],
  entryComponents: [DateRangePicker, FiltroAvanzadoDialogComponent, VerMasComponent, DemasiadosSubtipos, PermisoDePoda],
  providers: [{ provide: LOCALE_ID, useValue: "es-AR" }, BusquedaService, DownloadService, ClaimsAndComplaintsComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
