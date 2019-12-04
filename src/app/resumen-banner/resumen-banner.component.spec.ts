import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenBannerComponent } from './resumen-banner.component';

describe('ResumenBannerComponent', () => {
  let component: ResumenBannerComponent;
  let fixture: ComponentFixture<ResumenBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
