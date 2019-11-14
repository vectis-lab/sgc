import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardiacInformationComponent } from './cardiac-information.component';

describe('CardiacInformationComponent', () => {
  let component: CardiacInformationComponent;
  let fixture: ComponentFixture<CardiacInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardiacInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardiacInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
