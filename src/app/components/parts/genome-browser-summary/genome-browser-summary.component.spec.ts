import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeBrowserSummaryComponent } from './genome-browser-summary.component';

describe('GenomeBrowserSummaryComponent', () => {
  let component: GenomeBrowserSummaryComponent;
  let fixture: ComponentFixture<GenomeBrowserSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomeBrowserSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeBrowserSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
