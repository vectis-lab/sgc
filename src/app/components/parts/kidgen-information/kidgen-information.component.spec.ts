import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidgenInformationComponent } from './kidgen-information.component';

describe('KidgenInformationComponent', () => {
  let component: KidgenInformationComponent;
  let fixture: ComponentFixture<KidgenInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidgenInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidgenInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
