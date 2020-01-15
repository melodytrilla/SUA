import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsByOriginComponent } from './requests-by-origin.component';

describe('RequestsByOriginComponent', () => {
  let component: RequestsByOriginComponent;
  let fixture: ComponentFixture<RequestsByOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsByOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsByOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
