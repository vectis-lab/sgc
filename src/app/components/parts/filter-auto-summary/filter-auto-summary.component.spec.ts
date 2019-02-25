import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoSummaryComponent } from './filter-auto-summary.component';

describe('FilterAutoSummaryComponent', () => {
  let component: FilterAutoSummaryComponent;
  let fixture: ComponentFixture<FilterAutoSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAutoSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAutoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
