import { TestBed } from '@angular/core/testing';

import { MedicamentosService } from './medicamentos.service';

describe('MedicamentosService', () => {
  let service: MedicamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
