import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsByStateComponent } from './requests-by-state.component';

describe('RequestsByStateComponent', () => {
  let component: RequestsByStateComponent;
  let fixture: ComponentFixture<RequestsByStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsByStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
