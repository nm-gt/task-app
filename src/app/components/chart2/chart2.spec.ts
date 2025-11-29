import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart2 } from './chart2';

describe('Chart2', () => {
  let component: Chart2;
  let fixture: ComponentFixture<Chart2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chart2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chart2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
