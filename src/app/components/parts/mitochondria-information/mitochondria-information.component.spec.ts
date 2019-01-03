import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitochondriaInformationComponent } from './mitochondria-information.component';

describe('MitochondriaInformationComponent', () => {
  let component: MitochondriaInformationComponent;
  let fixture: ComponentFixture<MitochondriaInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitochondriaInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitochondriaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
