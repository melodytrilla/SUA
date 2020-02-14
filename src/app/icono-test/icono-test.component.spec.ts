import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoTestComponent } from './icono-test.component';

describe('IconoTestComponent', () => {
  let component: IconoTestComponent;
  let fixture: ComponentFixture<IconoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
