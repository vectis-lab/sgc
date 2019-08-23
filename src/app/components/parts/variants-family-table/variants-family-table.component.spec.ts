import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsFamilyTableComponent } from './variants-family-table.component';

describe('VariantsFamilyTableComponent', () => {
  let component: VariantsFamilyTableComponent;
  let fixture: ComponentFixture<VariantsFamilyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantsFamilyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsFamilyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
