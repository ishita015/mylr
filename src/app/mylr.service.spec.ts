import { TestBed, inject } from '@angular/core/testing';

import { MylrService } from './mylr.service';

describe('MylrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MylrService]
    });
  });

  it('should be created', inject([MylrService], (service: MylrService) => {
    expect(service).toBeTruthy();
  }));
});
