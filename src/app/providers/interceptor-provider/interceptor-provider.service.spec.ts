import { TestBed, inject } from '@angular/core/testing';

import { InterceptorProviderService } from './interceptor-provider.service';

describe('InterceptorProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterceptorProviderService]
    });
  });

  it('should be created', inject([InterceptorProviderService], (service: InterceptorProviderService) => {
    expect(service).toBeTruthy();
  }));
});
