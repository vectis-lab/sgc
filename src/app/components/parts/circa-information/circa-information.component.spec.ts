import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircaInformationComponent } from './circa-information.component';

describe('CircaInformationComponent', () => {
  let component: CircaInformationComponent;
  let fixture: ComponentFixture<CircaInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircaInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
