import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-samples-list',
  templateUrl: './samples-list.component.html',
  styleUrls: ['./samples-list.component.css']
})
export class SamplesListComponent implements OnInit {
  @Input() sampleIDs : string[] = [];
  @Input() showSampleCSV : boolean;
  @Input() selectedSamples : string[];
  @Output() onSelectSamples = new EventEmitter<string[]>();
  @Output() onUpdateSamples = new EventEmitter<string[]>();
  @Input() multiple: boolean = true;
  size = this.sampleIDs.length;

  constructor() { }

  ngOnInit() {
  }

  resetFilter() {
    this.onSelectSamples.emit(this.sampleIDs);
  }

  onSelect(samples){
    this.onSelectSamples.emit(samples);
  }

  filterCSV(samples){
    this.onUpdateSamples.emit(samples.map(sample => sample.trim()));
  }

}
