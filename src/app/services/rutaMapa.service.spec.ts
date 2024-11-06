import { TestBed } from '@angular/core/testing';

import { RutaMapaService } from './rutaMapa.service';

describe('RutaMapaService', () => {
  let service: RutaMapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaMapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
