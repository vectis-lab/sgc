import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneListComponent } from './gene-list.component';

describe('GeneListComponent', () => {
  let component: GeneListComponent;
  let fixture: ComponentFixture<GeneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
