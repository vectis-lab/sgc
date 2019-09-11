import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchQueries } from '../../../model/search-query';
import { VariantSearchService } from '../../../services/variant-search-service';
import { Subscription } from 'rxjs/Subscription';
import { Variant } from '../../../model/variant';

@Component({
  selector: 'app-family-tab-new',
  templateUrl: './family-tab-new.component.html',
  styleUrls: ['./family-tab-new.component.css'],
  providers: [VariantSearchService]
})
export class FamilyTabNewComponent implements AfterViewInit {
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
  private unfilteredVariants: Variant[] = [];
  private subscriptions: Subscription[] = [];
  familyMembers: any[];

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
    this.variants = [];
    this.loadingVariants = true;
    this.sampleNotFound = false;
    this.selectedExternalIDs = externalSamples;
    let sample = this.pheno.filter(s => this.selectedExternalIDs.includes(s.externalIDs) && s.familyId);
    if(sample.length === 0){
      this.sampleNotFound = true;
      this.loadingVariants = false;
      this.familyMembers = [];
      this.variants = [];
      return ;
    }
    this.familyMembers = this.pheno.filter(s => {
      return sample[0].familyId === s.familyId
    });
    this.selectedInternalIDs = this.familyMembers.map(s => s.internalIDs);
    const allQueries = this.selectedInternalIDs.map(id => {
      return this.searchService.getVariantsForFamily(this.searchQueries, id)
    })

    Promise.all(allQueries).then((v) => {
      this.loadingVariants = false;
      this.variants = this.combineVariants(v);
      this.unfilteredVariants = this.variants;
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

  selectFilter(filter){
    switch (filter) {
      case 'All':
        this.variants = this.unfilteredVariants;
        break;
      case 'Heterozygous dominant':
        this.variants = this.unfilteredVariants.filter(v => {
          return (v.vhetc === 1) && ((v.vhetc1 ===1 && typeof v.vhetc2 ==='undefined') || (typeof v.vhetc1 ==='undefined' && v.vhetc2 ===1));
        });
        break;
      case 'Homozygous recessive':
      this.variants = this.unfilteredVariants.filter(v => {
        return v.vhetc === 0 && v.vhetc1 === 1 && v.vhetc2 === 1;
      });
        break;
      case 'Compound heterozygous':
        this.variants = this.unfilteredVariants.filter(v => {
          if(v.vhetc === 1 && ((v.vhetc1 === 1 && typeof v.vhetc2 === 'undefined')|| (v.vhetc2 === 1 && typeof v.vhetc1 === 'undefined'))){
            let geneDetails = null;
            let parentOne = v.vhetc1;
            let parentTwo = v.vhetc2;
            //Check which region does it belong to
            this.searchService.lastQuery.regions.find(r => {
              r.genes.find(g => {
                if(g.chromosome === v.c && g.start <= v.s && g.end >= v.s){
                  geneDetails = g;
                  return true;
                }
              })
              return false;
            })
            let variantWithinRegion = this.unfilteredVariants.filter(variant => geneDetails && variant.c === geneDetails.chromosome && variant.s >= geneDetails.start && variant.s <= geneDetails.end);

            //check if there are other het variant for other parent within same region
            let otherHet = variantWithinRegion.find(variant => {
              if(parentOne)
                return variant.vhetc === 1 && variant.vhetc2 === parentOne && typeof variant.vhetc1 === 'undefined'
              else if(parentTwo)
                return variant.vhetc === 1 && typeof variant.vhetc2 === 'undefined' && variant.vhetc1 === parentTwo
            });

            if(otherHet){
              return true;
            }
          }
          return false;
        });
        break;
      case 'De novo dominant':
      this.variants = this.unfilteredVariants.filter(v => {
        return (v.vhetc === 1) && ((typeof v.vhetc1 ==='undefined' && typeof v.vhetc2 ==='undefined') || (v.vhetc1 === 0 && v.vhetc2 === 0));
      });
        break;
    }
  }

}
