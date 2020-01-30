import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTestComponent } from './desplegable-test.component';

describe('DesplegableTestComponent', () => {
  let component: DesplegableTestComponent;
  let fixture: ComponentFixture<DesplegableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
