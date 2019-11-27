import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-samples-list',
  templateUrl: './samples-list.component.html',
  styleUrls: ['./samples-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplesListComponent implements OnInit, OnDestroy {
  @Input() sampleIDs : string[] = [];
  @Input() showSampleCSV : boolean;
  @Input() selectedSamples : string[];
  @Output() onSelectSamples = new EventEmitter<string[]>();
  @Output() onUpdateSamples = new EventEmitter<string[]>();
  @Input() multiple: boolean = true;
  size = this.sampleIDs.length;
  lastClickedIndex = null;
  
  constructor() { }

  ngOnInit() {
  }

  resetFilter() {
    this.onSelectSamples.emit(this.sampleIDs);
  }

  onSelect(sample, e){
    let samples = []
    if(e.ctrlKey || e.metaKey){
      if(this.selectedSamples.some(id => id===sample)){
        let i = this.selectedSamples.indexOf(sample);
        samples = Object.assign([],this.selectedSamples);
        samples.splice(i, 1);
      }else{
        samples = this.selectedSamples.concat([sample]);
      }
      this.lastClickedIndex = this.sampleIDs.indexOf(sample)
    }else if(e.shiftKey){
        const lastIndex = this.sampleIDs.indexOf(sample);
        samples = Object.assign([], this.sampleIDs);
        if(this.lastClickedIndex > lastIndex){
          samples = samples.slice(lastIndex, this.lastClickedIndex + 1)
        }else{
          samples = samples.slice(this.lastClickedIndex, lastIndex + 1)
        }
    }else{
      samples=[sample];
      this.lastClickedIndex = this.sampleIDs.indexOf(sample)
    }
    this.onSelectSamples.emit(samples);
  }

  filterCSV(samples){
    this.onUpdateSamples.emit(samples.map(sample => sample.trim()));
  }

  checkSelectedSample(id){
    return this.selectedSamples.includes(id);
  }

  ngOnDestroy() {
  }

}
