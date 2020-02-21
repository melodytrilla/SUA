import { TestBed } from '@angular/core/testing';

import { IconosManagerService } from './iconos-manager.service';

describe('IconosManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IconosManagerService = TestBed.get(IconosManagerService);
    expect(service).toBeTruthy();
  });
});
