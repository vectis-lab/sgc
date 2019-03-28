import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalFilteringComponent } from './clinical-filtering.component';

describe('ClinicalFilteringComponent', () => {
  let component: ClinicalFilteringComponent;
  let fixture: ComponentFixture<ClinicalFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
