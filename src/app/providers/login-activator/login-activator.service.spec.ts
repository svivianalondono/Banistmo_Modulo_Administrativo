import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginActivatorService } from './login-activator.service';

describe('LoginActivatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginActivatorService]
    });
  });

  it('should be created', inject([LoginActivatorService], (service: LoginActivatorService) => {
    expect(service).toBeTruthy();
  }));
});
