import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-family-tab',
  templateUrl: './family-tab.component.html',
  styleUrls: ['./family-tab.component.css']
})
export class FamilyTabComponent implements AfterViewInit {
  @Input() pheno: any;
  @Input() samples: string[];
  selectedExternalIDs: string[] = [];
  selectedInternalIDs: string[] = [];
  externalIDs: string[];
  showSampleCSV: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(){
    this.externalIDs = this.pheno.filter(s => {
      return this.samples.includes(s.internalIDs)
    }).map(s => s.externalIDs);

  }

  onSelectSamples(externalSamples){
    this.selectedExternalIDs = externalSamples;
    let sample = this.pheno.filter(s => this.selectedExternalIDs.includes(s.externalIDs));
    this.selectedInternalIDs = sample.map(s => s.internalIDs).concat(sample[0].familyMembers);

    this.cd.detectChanges();
  }

  onUpdateSamples(externalSamples){

  }

}
