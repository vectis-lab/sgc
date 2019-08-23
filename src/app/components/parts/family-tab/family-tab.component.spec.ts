import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTabComponent } from './family-tab.component';

describe('FamilyTabComponent', () => {
  let component: FamilyTabComponent;
  let fixture: ComponentFixture<FamilyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
