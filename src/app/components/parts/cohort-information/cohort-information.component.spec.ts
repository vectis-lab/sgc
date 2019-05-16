import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortInformationComponent } from './cohort-information.component';

describe('CohortInformationComponent', () => {
  let component: CohortInformationComponent;
  let fixture: ComponentFixture<CohortInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
