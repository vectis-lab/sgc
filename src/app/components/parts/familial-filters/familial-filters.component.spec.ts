import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilialFiltersComponent } from './familial-filters.component';

describe('FamilialFiltersComponent', () => {
  let component: FamilialFiltersComponent;
  let fixture: ComponentFixture<FamilialFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilialFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilialFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
