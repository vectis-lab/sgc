import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrbInformationComponent } from './mgrb-information.component';

describe('MgrbInformationComponent', () => {
  let component: MgrbInformationComponent;
  let fixture: ComponentFixture<MgrbInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgrbInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgrbInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
