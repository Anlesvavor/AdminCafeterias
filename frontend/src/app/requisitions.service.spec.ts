import { TestBed } from '@angular/core/testing';

import { RequisitionsService } from './requisitions.service';

describe('RequisitionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequisitionsService = TestBed.get(RequisitionsService);
    expect(service).toBeTruthy();
  });
});
