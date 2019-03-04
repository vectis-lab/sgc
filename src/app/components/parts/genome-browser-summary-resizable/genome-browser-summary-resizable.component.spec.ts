import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeBrowserSummaryResizableComponent } from './genome-browser-summary-resizable.component';

describe('GenomeBrowserSummaryResizableComponent', () => {
  let component: GenomeBrowserSummaryResizableComponent;
  let fixture: ComponentFixture<GenomeBrowserSummaryResizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomeBrowserSummaryResizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeBrowserSummaryResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
