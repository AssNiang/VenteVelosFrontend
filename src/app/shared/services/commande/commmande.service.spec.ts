import { TestBed } from '@angular/core/testing';

import { CommmandeService } from './commmande.service';

describe('CommmandeService', () => {
  let service: CommmandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommmandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
