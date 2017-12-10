import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptorServiceService } from './http-interceptor-service.service';

describe('HttpInterceptorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptorServiceService]
    });
  });

  it('should be created', inject([HttpInterceptorServiceService], (service: HttpInterceptorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
