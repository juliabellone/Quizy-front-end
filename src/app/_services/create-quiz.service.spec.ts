import { TestBed, inject } from '@angular/core/testing';

import { CreateQuizService } from './create-quiz.service';

describe('CreateQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateQuizService]
    });
  });

  it('should be created', inject([CreateQuizService], (service: CreateQuizService) => {
    expect(service).toBeTruthy();
  }));
});
