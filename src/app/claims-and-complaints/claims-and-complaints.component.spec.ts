import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsAndComplaintsComponent } from './claims-and-complaints.component';

describe('ClaimsAndComplaintsComponent', () => {
  let component: ClaimsAndComplaintsComponent;
  let fixture: ComponentFixture<ClaimsAndComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsAndComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsAndComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
