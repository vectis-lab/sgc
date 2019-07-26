import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpilepticEncephalopathiesInformationComponent } from './epileptic-encephalopathies-information.component';

describe('EpilepticEncephalopathiesInformationComponent', () => {
  let component: EpilepticEncephalopathiesInformationComponent;
  let fixture: ComponentFixture<EpilepticEncephalopathiesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpilepticEncephalopathiesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpilepticEncephalopathiesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
