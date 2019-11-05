import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenInformationComponent } from './hidden-information.component';

describe('HiddenInformationComponent', () => {
  let component: HiddenInformationComponent;
  let fixture: ComponentFixture<HiddenInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
