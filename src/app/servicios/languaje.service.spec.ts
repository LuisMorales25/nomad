import { TestBed } from '@angular/core/testing';

import { LanguajeService } from './languaje.service';

describe('LanguajeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguajeService = TestBed.get(LanguajeService);
    expect(service).toBeTruthy();
  });
});
