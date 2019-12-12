import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsByDistrictComponent } from './requests-by-district.component';

describe('RequestsByDistrictComponent', () => {
  let component: RequestsByDistrictComponent;
  let fixture: ComponentFixture<RequestsByDistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsByDistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsByDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
