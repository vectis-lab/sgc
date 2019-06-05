import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleleFreqSummaryComponent } from './allele-freq-summary.component';

describe('AlleleFreqSummaryComponent', () => {
  let component: AlleleFreqSummaryComponent;
  let fixture: ComponentFixture<AlleleFreqSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlleleFreqSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleleFreqSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
