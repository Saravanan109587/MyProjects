import { TestBed, inject } from '@angular/core/testing';

import { AddcandidateService } from './addcandidate.service';

describe('AddcandidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddcandidateService]
    });
  });

  it('should be created', inject([AddcandidateService], (service: AddcandidateService) => {
    expect(service).toBeTruthy();
  }));
});
