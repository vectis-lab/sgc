import {
  Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
} from '@angular/core';
import { VariantSummary } from '../../../model/variant-summary';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { VariantSummaryTrackService } from '../../../services/genome-browser/variant-summary-track-service';

import * as Papa from 'papaparse';
import { VariantSummarySearchService } from '../../../services/variant-summary-search-service';
import { TableSummaryService } from '../../../services/table-summary-service';
import { FilterAutoSummaryComponent } from '../filter-auto-summary/filter-auto-summary.component';
import { ALLELEFREQ_DIFFERENCE_THRESHOLD } from '../../../shared/afThreshold';

const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';
const MINIMAL_VIEW = 500;

@Component({
  selector: 'app-variants-summary-table',
  templateUrl: './variants-summary-table.component.html',
  styleUrls: ['./variants-summary-table.component.css', '../../../shared/table-results.css']
})
export class VariantsSummaryTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() variants: VariantSummary[];
  @ViewChild(FilterAutoSummaryComponent) filterComponent: FilterAutoSummaryComponent;
  pageSize = 10;
  currentPage = 1;
  dbSnpUrl = VariantSummary.dbSnpUrl;
  showSettings = true;
  private highlightedVariant: VariantSummary;
  private subscriptions: Subscription[] = [];

  constructor(public  ts: TableSummaryService,
              private searchService: VariantSummarySearchService,
              private variantTrack: VariantSummaryTrackService,
              private cd: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
      if (window.screen.width < MINIMAL_VIEW) {
          this.ts.minimalView();
          this.showSettings = false;
      }

      this.subscriptions.push(this.variantTrack.highlightedVariant.subscribe((v: VariantSummary) => {
          if (v.highlight) {
              this.highlightedVariant = v;
          } else {
              this.highlightedVariant = null;
          }
          this.cd.detectChanges();
      }));

      this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: VariantSummary) => {
          const index = this.variants.findIndex((v => this.compare(v, variant)));
          this.currentPage = Math.ceil((index + 1) / this.pageSize);
          this.cd.detectChanges();
      }));

      this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: VariantSummary) => {
          const index = this.variants.findIndex((v => this.compare(v, variant)));
          this.currentPage = Math.ceil((index + 1) / this.pageSize);
          this.cd.detectChanges();
      }));

  }

  ngAfterViewInit() {
      this.subscriptions.push(this.searchService.results.subscribe(() => {
          this.currentPage = 0;
          this.filterComponent.reset(this.variants);
          this.cd.detectChanges();
      }));
  }

  highlightVariant(variant: VariantSummary) {
      variant.highlight = true;
      this.variantTrack.highlightedVariant.next(variant);
  }

  unHighlightVariant(variant: VariantSummary) {
      variant.highlight = false;
      this.variantTrack.highlightedVariant.next(variant);
  }

  sortVariants(label: string) {
      this.ts.sort(label, this.variants);
  }

  downloadFile() {
      const data = this.variants.map((v: VariantSummary) => {
          return {
              'Chrom': v.chr,
              'Position': v.start,
              'RSID': v.rsid,
              'Reference': v.ref,
              'Alternate': v.alt,
              'Type': v.type,
              'Homozygotes Count': v.nHomVar,
              'Heterozygotes Count': v.nHet,
              'Allele Count': v.ac,
              'Allele Frequency': v.af,
              'cato': v.cato,
              'eigen': v.eigen,
              'sift': v.sift,
              'polyPhen': v.polyPhen,
              'tgpAF': v.tgpAF,
              'hrcAF': v.hrcAF,
              'gnomadAF': v.gnomadAF,
              'consequences': v.consequences,
              'gene': v.geneSymbol,
              'clinvar': v.clinvar
          };
      });
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], {type: 'text/plain'});
      saveAs(blob, 'mgrb_' + this.searchService.getCurrentRegion().name() + '_' + new Date().getTime() + '.csv');
  }

  compare(a: VariantSummary, b: VariantSummary) {
      return JSON.stringify(a) === JSON.stringify(b);
  }

  compareAlleleFreq(variant: VariantSummary, self: number, comparator: number) {
    if(variant[self] && variant[comparator]){
        if(Math.abs(variant[self] - variant[comparator]) > ALLELEFREQ_DIFFERENCE_THRESHOLD){
            if(variant[self] > variant[comparator]){
                return true;
            }    
        }
    }
    return false;
}

  ngOnDestroy() {
      this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onFilter(filtered: VariantSummary[]) {
      this.variants = filtered;
  }

  variantUrl(v: VariantSummary) {
      return this.router.createUrlTree(['/search/variant', {query: VariantSummary.displayName(v)}]).toString();
  }

  variantVarsomeUrl(v: VariantSummary) {
    return `https://varsome.com/variant/hg19/${VariantSummary.displayName(v)}`;
  }

  toggleScales($event) {
      $event.stopPropagation();
      this.ts.showScales = !this.ts.showScales;
  }

  activateColumn($event, key) {
      $event.stopPropagation();
      this.ts.set(key, !this.ts.get(key))
  }

}