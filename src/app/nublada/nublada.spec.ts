import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nublada } from './nublada';

describe('Nublada', () => {
  let component: Nublada;
  let fixture: ComponentFixture<Nublada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nublada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nublada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
