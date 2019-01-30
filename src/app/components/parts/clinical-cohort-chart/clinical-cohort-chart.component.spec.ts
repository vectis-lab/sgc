import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalCohortChartComponent } from './clinical-cohort-chart.component';

describe('ClinicalCohortChartComponent', () => {
  let component: ClinicalCohortChartComponent;
  let fixture: ComponentFixture<ClinicalCohortChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalCohortChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalCohortChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
