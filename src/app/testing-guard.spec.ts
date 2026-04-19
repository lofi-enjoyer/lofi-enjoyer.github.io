import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { testingGuard } from './testing-guard';

describe('testingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => testingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
