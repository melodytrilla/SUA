import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsContainerComponent } from './chips-container.component';

describe('ChipsContainerComponent', () => {
  let component: ChipsContainerComponent;
  let fixture: ComponentFixture<ChipsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
