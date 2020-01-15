import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarLoginComponent } from './side-bar-login.component';

describe('SideBarLoginComponent', () => {
  let component: SideBarLoginComponent;
  let fixture: ComponentFixture<SideBarLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
