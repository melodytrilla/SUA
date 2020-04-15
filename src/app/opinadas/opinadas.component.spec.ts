import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinadasComponent } from './opinadas.component';

describe('OpinadasComponent', () => {
  let component: OpinadasComponent;
  let fixture: ComponentFixture<OpinadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
