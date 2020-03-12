import { NgModule } from '@angular/core';

import {
  MatToolbarModule, MatTooltipModule,
  MatDividerModule,
  MatChipsModule,
  MatExpansionModule,
  MatDialogModule,
  MatCheckboxModule, 
  MatRadioModule,
  MatTabsModule,
  MatSelectModule,
  MatBadgeModule,
  MatSidenavModule, MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule, MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule ,
    MatCheckboxModule, MatRadioModule,
    MatTabsModule,
    MatSelectModule,
    MatBadgeModule,
    MatSidenavModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule,
    MatProgressSpinnerModule,
  ]
})
export class MaterialModule { }
