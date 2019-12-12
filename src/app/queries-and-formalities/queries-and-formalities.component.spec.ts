import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesAndFormalitiesComponent } from './queries-and-formalities.component';

describe('QueriesAndFormalitiesComponent', () => {
  let component: QueriesAndFormalitiesComponent;
  let fixture: ComponentFixture<QueriesAndFormalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesAndFormalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesAndFormalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
