import { TestBed, inject } from '@angular/core/testing';

import { RequestHttpService } from './request-http.service';

describe('RequestHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestHttpService]
    });
  });

  it('should be created', inject([RequestHttpService], (service: RequestHttpService) => {
    expect(service).toBeTruthy();
  }));
});
