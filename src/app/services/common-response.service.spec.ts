import { TestBed } from '@angular/core/testing';

import { CommonResponseService } from './common-response.service';

describe('CommonResponseService', () => {
  let service: CommonResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
