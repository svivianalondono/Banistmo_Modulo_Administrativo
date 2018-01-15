import { TestBed, inject } from '@angular/core/testing';

import { LoginProviderService } from './login-provider.service';

describe('LoginProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginProviderService]
    });
  });

  it('should be created', inject([LoginProviderService], (service: LoginProviderService) => {
    expect(service).toBeTruthy();
  }));
});
