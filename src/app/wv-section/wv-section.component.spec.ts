import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvSectionComponent } from './wv-section.component';

describe('WvSectionComponent', () => {
  let component: WvSectionComponent;
  let fixture: ComponentFixture<WvSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WvSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WvSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
