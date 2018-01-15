import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RequestHttpService } from './request-http.service';

describe('RequestHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RequestHttpService]
    });
  });

  it('should be created', inject([RequestHttpService], (service: RequestHttpService) => {
    expect(service).toBeTruthy();
  }));
});
