import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantSummaryComponent } from './variant-summary.component';

describe('VariantSummaryComponent', () => {
  let component: VariantSummaryComponent;
  let fixture: ComponentFixture<VariantSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
