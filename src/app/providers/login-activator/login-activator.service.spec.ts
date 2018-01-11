import { TestBed, inject } from '@angular/core/testing';

import { LoginActivatorService } from './login-activator.service';

describe('LoginActivatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginActivatorService]
    });
  });

  it('should be created', inject([LoginActivatorService], (service: LoginActivatorService) => {
    expect(service).toBeTruthy();
  }));
});
