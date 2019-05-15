import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcutecareInformationComponent } from './acutecare-information.component';

describe('AcutecareInformationComponent', () => {
  let component: AcutecareInformationComponent;
  let fixture: ComponentFixture<AcutecareInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcutecareInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcutecareInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
