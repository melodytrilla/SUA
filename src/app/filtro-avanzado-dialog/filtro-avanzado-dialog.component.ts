import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filtro-avanzado-dialog',
  templateUrl: './filtro-avanzado-dialog.component.html',
  styleUrls: ['./filtro-avanzado-dialog.component.sass']
})
export class FiltroAvanzadoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FiltroAvanzadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
