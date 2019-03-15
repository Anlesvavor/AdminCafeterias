import { TestBed } from '@angular/core/testing';

import { DeliveryTruckService } from './deliveryTruck.service';

describe('DeliveryTruckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryTruckService = TestBed.get(DeliveryTruckService);
    expect(service).toBeTruthy();
  });
});
