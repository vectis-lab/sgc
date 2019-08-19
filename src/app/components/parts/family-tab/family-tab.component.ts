import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchQueries } from '../../../model/search-query';
import { VariantSearchService } from '../../../services/variant-search-service';
import { Subscription } from 'rxjs/Subscription';
import { Variant } from '../../../model/variant';

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
  public variants: Variant[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private cd: ChangeDetectorRef,
              public searchService: VariantSearchService,) { }

  ngAfterViewInit(){
    this.externalIDs = this.pheno.filter(s => {
      return this.samples.includes(s.internalIDs)
    }).map(s => s.externalIDs);

    this.variants = this.searchService.variants;

    this.subscriptions.push(this.searchService.results.subscribe(v => {
        this.variants = v.variants;
        this.cd.detectChanges();
    }));
  }

  onSelectSamples(externalSamples){
    this.loadingVariants = true;
    this.selectedExternalIDs = externalSamples;
    let sample = this.pheno.filter(s => this.selectedExternalIDs.includes(s.externalIDs));
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
      }
    }
    res = Object.values(hash);
    return res;
  }

  onUpdateSamples(externalSamples){

  }

}
