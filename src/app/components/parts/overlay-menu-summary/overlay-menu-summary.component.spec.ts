import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayMenuSummaryComponent } from './overlay-menu-summary.component';

describe('OverlayMenuSummaryComponent', () => {
  let component: OverlayMenuSummaryComponent;
  let fixture: ComponentFixture<OverlayMenuSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayMenuSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayMenuSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
