import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortAuthorsComponent } from './cohort-authors.component';

describe('CohortAuthorsComponent', () => {
  let component: CohortAuthorsComponent;
  let fixture: ComponentFixture<CohortAuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortAuthorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
