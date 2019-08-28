import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInformationComponent } from './demo-information.component';

describe('DemoInformationComponent', () => {
  let component: DemoInformationComponent;
  let fixture: ComponentFixture<DemoInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
