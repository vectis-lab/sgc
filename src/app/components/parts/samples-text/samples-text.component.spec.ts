import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesTextComponent } from './samples-text.component';

describe('SamplesTextComponent', () => {
  let component: SamplesTextComponent;
  let fixture: ComponentFixture<SamplesTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
