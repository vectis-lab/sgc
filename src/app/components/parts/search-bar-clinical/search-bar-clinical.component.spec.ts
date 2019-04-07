import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarClinicalComponent } from './search-bar-clinical.component';

describe('SearchBarClinicalComponent', () => {
  let component: SearchBarClinicalComponent;
  let fixture: ComponentFixture<SearchBarClinicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarClinicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarClinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
