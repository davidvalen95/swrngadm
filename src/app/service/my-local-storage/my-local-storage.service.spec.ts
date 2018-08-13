import { TestBed, inject } from '@angular/core/testing';

import { MyLocalStorageService } from './my-local-storage.service';

describe('MyLocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLocalStorageService]
    });
  });

  it('should be created', inject([MyLocalStorageService], (service: MyLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
