import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAvanzadoDialogComponent } from './filtro-avanzado-dialog.component';

describe('FiltroAvanzadoDialogComponent', () => {
  let component: FiltroAvanzadoDialogComponent;
  let fixture: ComponentFixture<FiltroAvanzadoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAvanzadoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAvanzadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
