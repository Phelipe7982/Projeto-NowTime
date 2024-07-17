import { TestBed } from '@angular/core/testing';

import { NytimesService } from './nytimes.service';

describe('NytimesService', () => {
  let service: NytimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NytimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
