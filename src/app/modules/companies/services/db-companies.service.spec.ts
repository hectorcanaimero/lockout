import { TestBed } from '@angular/core/testing';

import { DbCompaniesService } from './db-companies.service';

describe('DbCompaniesService', () => {
  let service: DbCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
