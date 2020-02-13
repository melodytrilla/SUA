import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
  MatChipsModule,
  MatExpansionModule,
  MatDialogModule,
  MatCheckboxModule, 
  MatRadioModule,
  MatTabsModule,
  MatSelectModule,
  MatBadgeModule,
  MatSidenavModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule ,
    MatCheckboxModule, 
    MatRadioModule,
    MatTabsModule,
    MatSelectModule,
    MatBadgeModule,
    MatSidenavModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
