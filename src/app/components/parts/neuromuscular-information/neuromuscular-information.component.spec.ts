import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuromuscularInformationComponent } from './neuromuscular-information.component';

describe('NeuromuscularInformationComponent', () => {
  let component: NeuromuscularInformationComponent;
  let fixture: ComponentFixture<NeuromuscularInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuromuscularInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuromuscularInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
