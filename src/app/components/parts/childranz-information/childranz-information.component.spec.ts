import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildranzInformationComponent } from './childranz-information.component';

describe('ChildranzInformationComponent', () => {
  let component: ChildranzInformationComponent;
  let fixture: ComponentFixture<ChildranzInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildranzInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildranzInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
