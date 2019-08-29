import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTabNewComponent } from './family-tab-new.component';

describe('FamilyTabNewComponent', () => {
  let component: FamilyTabNewComponent;
  let fixture: ComponentFixture<FamilyTabNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyTabNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTabNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
