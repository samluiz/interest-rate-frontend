import { TestBed } from '@angular/core/testing';

import { GetUUIDService } from './click.service';

describe('ClickService', () => {
  let service: GetUUIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUUIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
