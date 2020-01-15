import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10NeighborhoodsComponent } from './top10-neighborhoods.component';

describe('Top10NeighborhoodsComponent', () => {
  let component: Top10NeighborhoodsComponent;
  let fixture: ComponentFixture<Top10NeighborhoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10NeighborhoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10NeighborhoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
