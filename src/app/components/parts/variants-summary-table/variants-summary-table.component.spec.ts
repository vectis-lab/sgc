import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsSummaryTableComponent } from './variants-summary-table.component';

describe('VariantsSummaryTableComponent', () => {
  let component: VariantsSummaryTableComponent;
  let fixture: ComponentFixture<VariantsSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantsSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
