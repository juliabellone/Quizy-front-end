import { TestBed, inject } from '@angular/core/testing';

import { UserquizesService } from './userquizes.service';

describe('UserquizesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserquizesService]
    });
  });

  it('should be created', inject([UserquizesService], (service: UserquizesService) => {
    expect(service).toBeTruthy();
  }));
});
