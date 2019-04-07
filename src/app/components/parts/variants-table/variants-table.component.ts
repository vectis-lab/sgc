import {
    Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
} from '@angular/core';
import { Variant } from '../../../model/variant';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import * as Papa from 'papaparse';
import { VariantSearchService } from '../../../services/variant-search-service';
import { TableService } from '../../../services/table-service';
import { FilterAutoComponent } from '../filter-auto/filter-auto.component';
import { ALLELEFREQ_DIFFERENCE_THRESHOLD } from '../../../shared/afThreshold';

const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';
const MINIMAL_VIEW = 500;


@Component({
    selector: 'app-variants-table',
    templateUrl: './variants-table.component.html',
    styleUrls: ['./variants-table.component.css', '../../../shared/table-results.css']
})
export class VariantsTableComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() variants: Variant[];
    @ViewChild(FilterAutoComponent) filterComponent: FilterAutoComponent;
    pageSize = 10;
    currentPage = 1;
    dbSnpUrl = Variant.dbSnpUrl;
    showSettings = true;
    private highlightedVariant: Variant;
    private subscriptions: Subscription[] = [];
    private afThreshold = ALLELEFREQ_DIFFERENCE_THRESHOLD;

    constructor(public  ts: TableService,
                private searchService: VariantSearchService,
                private cd: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        if (window.screen.width < MINIMAL_VIEW) {
            this.ts.minimalView();
            this.showSettings = false;
        }

    }

    ngAfterViewInit() {
        this.subscriptions.push(this.searchService.results.subscribe(() => {
            this.currentPage = 0;
            this.filterComponent.reset(this.variants);
            this.cd.detectChanges();
        }));
    }

    highlightVariant(variant: Variant) {
        variant.highlight = true;
    }

    unHighlightVariant(variant: Variant) {
        variant.highlight = false;
    }

    sortVariants(label: string) {
        this.ts.sort(label, this.variants);
    }

    downloadFile() {
        const data = this.variants.map((v: Variant) => {
            return {
                'Chrom': v.c,
                'Position': v.s,
                'RSID': v.rs,
                'Reference': v.r,
                'Alternate': v.a,
                'Type': v.t,
                'Homozygotes Count': v.homc,
                'Heterozygotes Count': v.hetc,
                'Allele Count': v.ac,
                'Allele Frequency': v.af,
            };
        });
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], {type: 'text/plain'});
        saveAs(blob, 'mgrb_' + this.searchService.getCurrentRegion().name() + '_' + new Date().getTime() + '.csv');
    }

    compare(a: Variant, b: Variant) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    compareAlleleFreq(variant: Variant, self: number, comparator: number) {
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

    onFilter(filtered: Variant[]) {
        this.variants = filtered;
    }

    variantUrl(v: Variant) {
        return this.router.createUrlTree(['/search/variant', {query: Variant.displayName(v)}]).toString();
    }

    variantVarsomeUrl(v: Variant) {
        return `https://varsome.com/variant/hg19/${Variant.displayName(v)}`;
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
