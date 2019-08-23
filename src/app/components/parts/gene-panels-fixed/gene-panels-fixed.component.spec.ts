import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenePanelsComponent } from './gene-panels.component';

describe('GenePanelsComponent', () => {
  let component: GenePanelsComponent;
  let fixture: ComponentFixture<GenePanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenePanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenePanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
