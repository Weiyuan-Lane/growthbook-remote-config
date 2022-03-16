import { TestBed } from '@angular/core/testing';

import { GrowthbookSingletonService } from './growthbook-singleton.service';

describe('GrowthbookSingletonService', () => {
  let service: GrowthbookSingletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowthbookSingletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
