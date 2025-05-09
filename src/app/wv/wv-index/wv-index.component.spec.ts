import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WvIndexComponent } from './wv-index.component';

describe('WvIndexComponent', () => {
  let component: WvIndexComponent;
  let fixture: ComponentFixture<WvIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WvIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WvIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
