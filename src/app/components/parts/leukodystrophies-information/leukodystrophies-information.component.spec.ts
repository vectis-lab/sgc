import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeukodystrophiesInformationComponent } from './leukodystrophies-information.component';

describe('LeukodystrophiesInformationComponent', () => {
  let component: LeukodystrophiesInformationComponent;
  let fixture: ComponentFixture<LeukodystrophiesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeukodystrophiesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeukodystrophiesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
