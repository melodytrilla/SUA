import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaInfoComponent } from './carta-info.component';

describe('CartaInfoComponent', () => {
  let component: CartaInfoComponent;
  let fixture: ComponentFixture<CartaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
