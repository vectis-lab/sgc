import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-familial-filters',
  templateUrl: './familial-filters.component.html',
  styleUrls: ['./familial-filters.component.css']
})
export class FamilialFiltersComponent implements OnInit {
  filters = ['All', 'Heterozygous dominant', 'Homozygous recessive', 'De novo dominant']
  selectedFilter = 'All';
  @Output() appliedFilter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectFilter(e){
    this.appliedFilter.emit(e.value);
  }

}
