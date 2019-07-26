import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcconInformationComponent } from './iccon-information.component';

describe('IcconInformationComponent', () => {
  let component: IcconInformationComponent;
  let fixture: ComponentFixture<IcconInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcconInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcconInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
