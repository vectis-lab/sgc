import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutoFamilyComponent } from './filter-auto-family.component';

describe('FilterAutoFamilyComponent', () => {
  let component: FilterAutoFamilyComponent;
  let fixture: ComponentFixture<FilterAutoFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAutoFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAutoFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
