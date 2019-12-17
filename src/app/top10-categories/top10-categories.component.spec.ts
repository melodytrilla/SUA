import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10CategoriesComponent } from './top10-categories.component';

describe('Top10CategoriesComponent', () => {
  let component: Top10CategoriesComponent;
  let fixture: ComponentFixture<Top10CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10CategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
