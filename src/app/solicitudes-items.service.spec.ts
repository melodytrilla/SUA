import { TestBed } from '@angular/core/testing';

import { SolicitudesItemsService } from './solicitudes-items.service';

describe('SolicitudesItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitudesItemsService = TestBed.get(SolicitudesItemsService);
    expect(service).toBeTruthy();
  });
});
