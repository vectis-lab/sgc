import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { SearchQueries } from '../../../model/search-query';
import { VariantSearchService } from '../../../services/variant-search-service';
import { Subscription } from 'rxjs/Subscription';
import { Variant } from '../../../model/variant';
import { ClinapiService } from '../../../services/clinapi.service';

@Component({
  selector: 'app-family-tab',
  templateUrl: './family-tab.component.html',
  styleUrls: ['./family-tab.component.css'],
  providers: [VariantSearchService]
})
export class FamilyTabComponent implements AfterViewInit {
  @Input() pheno: any;
  @Input() samples: string[];
  @Input() searchQueries: SearchQueries;
  loadingVariants = false;
  selectedExternalIDs: string[] = [];
  selectedInternalIDs: string[] = [];
  externalIDs: string[];
  showSampleCSV: boolean = false;
  sampleNotFound: boolean = false;
  public variants: Variant[] = [];
  private subscriptions: Subscription[] = [];
  selectedExternalSamples = [];

  constructor(private cd: ChangeDetectorRef,
              public searchService: VariantSearchService,
              public cs: ClinapiService) { }

  ngAfterViewInit(){
    this.externalIDs = this.pheno.filter(s => {
      return this.samples.includes(s.internalIDs)
    }).map(s => s.externalIDs);

    this.variants = this.searchService.variants;

    this.subscriptions.push(this.searchService.results.subscribe(v => {
        this.variants = v.variants;
        this.cd.detectChanges();
    }));

    this.subscriptions.push(this.cs.selectedExternalSamplesClin.subscribe((samples) => {
      this.selectedExternalSamples = samples;
    }));
  }

  onSelectSamples(externalSamples){
    this.variants = [];
    this.loadingVariants = true;
    this.sampleNotFound = false;
    this.selectedExternalIDs = externalSamples;
    this.cs.setSelectedExternalSamplesFam(externalSamples);
    let sample = this.pheno.filter(s => this.selectedExternalIDs.includes(s.externalIDs));
    if(sample.length === 0){
      this.sampleNotFound = true;
      this.loadingVariants = false;
      return ;
    }
    this.selectedInternalIDs = sample.map(s => s.internalIDs).concat(sample[0].familyMembers);
    const allQueries = this.selectedInternalIDs.map(id => {
      return this.searchService.getVariantsForFamily(this.searchQueries, id)
    })

    Promise.all(allQueries).then((v) => {
      this.loadingVariants = false;
      this.variants = this.combineVariants(v);
    })
    this.cd.detectChanges();
  }

  combineVariants(variants: Variant[][]){
    let hash = {};
    let res = [];
    for(let i = 0; i<variants.length;i++){
      for(let j = 0; j<variants[i].length;j++){
        let tempVariant = variants[i][j]['c']+':'+variants[i][j]['s'] + ' ' + variants[i][j]['a'] + ' ' + variants[i][j]['r'];
        if(!hash[tempVariant]){
          hash[tempVariant] = variants[i][j];
          if(i>0){
            hash[tempVariant][`vhetc${i}`] = variants[i][j]['vhetc'];
            hash[tempVariant][`vhomc${i}`] = variants[i][j]['vhomc'];
            delete hash[tempVariant]['vhetc'];
            delete hash[tempVariant]['vhomc'];
          }
        }else{
          hash[tempVariant][`vhetc${i}`] = variants[i][j]['vhetc'];
          hash[tempVariant][`vhomc${i}`] = variants[i][j]['vhomc'];
        }
        if(typeof hash[tempVariant]['vhetc'] === 'undefined'){
          hash[tempVariant]['vhetc']= -1;
          hash[tempVariant]['vhomc']= -1;
        }
        if(typeof hash[tempVariant]['vhetc1'] === 'undefined'){
          hash[tempVariant]['vhetc1']= -1;
          hash[tempVariant]['vhomc1']= -1;
        }
        if(typeof hash[tempVariant]['vhetc2'] === 'undefined'){
          hash[tempVariant]['vhetc2']= -1;
          hash[tempVariant]['vhomc2']= -1;
        }
      }
    }
    res = Object.values(hash);
    return res;
  }

}
