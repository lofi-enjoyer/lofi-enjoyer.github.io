import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvEditionComponent } from './wv-edition.component';

describe('WvEditionComponent', () => {
  let component: WvEditionComponent;
  let fixture: ComponentFixture<WvEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WvEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WvEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
