import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainMalformationsInformationComponent } from './brain-malformations-information.component';

describe('BrainMalformationsInformationComponent', () => {
  let component: BrainMalformationsInformationComponent;
  let fixture: ComponentFixture<BrainMalformationsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainMalformationsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainMalformationsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
