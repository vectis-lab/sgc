import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitochondriaChartComponent } from './mitochondria-chart.component';

describe('MitochondriaChartComponent', () => {
  let component: MitochondriaChartComponent;
  let fixture: ComponentFixture<MitochondriaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitochondriaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitochondriaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
