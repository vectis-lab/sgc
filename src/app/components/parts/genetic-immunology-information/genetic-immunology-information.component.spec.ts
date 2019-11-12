import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticImmunologyInformationComponent } from './genetic-immunology-information.component';

describe('GeneticImmunologyInformationComponent', () => {
  let component: GeneticImmunologyInformationComponent;
  let fixture: ComponentFixture<GeneticImmunologyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticImmunologyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticImmunologyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
