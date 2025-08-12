import { TestBed } from '@angular/core/testing';

import { AccountCatalogueService } from './account-catalogue.service';

describe('AccountCatalogueService', () => {
  let service: AccountCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
