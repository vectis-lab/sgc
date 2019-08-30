import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipInformationComponent } from './relationship-information.component';

describe('RelationshipInformationComponent', () => {
  let component: RelationshipInformationComponent;
  let fixture: ComponentFixture<RelationshipInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
