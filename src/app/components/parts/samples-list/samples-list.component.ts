import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-samples-list',
  templateUrl: './samples-list.component.html',
  styleUrls: ['./samples-list.component.css']
})
export class SamplesListComponent implements OnInit {
  @Input() sampleIDs : string[];
  @Input() selectedSamples : string[];
  @Output() onSelectSamples = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  resetFilter() {
    this.onSelectSamples.emit(this.sampleIDs);
  }

  onSelect(samples){
    this.onSelectSamples.emit(samples);
  }

}
