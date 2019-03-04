import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { VariantSummary } from '../../../model/variant-summary';
import { MAXIMUM_NUMBER_OF_VARIANTS } from '../../../services/cttv-service';

import { VariantSearchService } from '../../../services/variant-search-service';
import { VariantSummarySearchService } from '../../../services/variant-summary-search-service';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { VariantSummaryTrackService } from '../../../services/genome-browser/variant-summary-track-service';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantAutocompleteResult, VariantSummaryAutocompleteResult } from '../../../model/autocomplete-result';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css'],
    providers: [VariantSearchService, VariantTrackService, VariantSummarySearchService, VariantSummaryTrackService]
})
export class SearchResultsComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() autocomplete: VariantAutocompleteResult<any>;
    @Input() autocompleteSummary: VariantSummaryAutocompleteResult<any>;
    @Output() errorEvent = new EventEmitter();
    showClin = false;
    public variants: Variant[] = [];
    public variantsSummary: VariantSummary[] = [];
    public loadingVariants = false;
    public loadingVariantsSummary = false;
    private subscriptions: Subscription[] = [];
    maximumNumberOfVariants = MAXIMUM_NUMBER_OF_VARIANTS;
    selectedTabIndex = 0;
    timeout = null;
    selectedCohort = "";
    private showVirtualCohort = new Subject<boolean>();
    showVirtualCohortFlag: boolean;


    constructor(public searchService: VariantSearchService,
                public searchSummaryService: VariantSummarySearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private router: Router,
                private route: ActivatedRoute,
                private clinicalFilteringService: ClinicalFilteringService,
            ) {
    }

    ngOnInit(): void {
        this.variants = this.searchService.variants;
        this.variantsSummary = this.searchSummaryService.variants;
        
        this.showVirtualCohort.next(false);

        this.subscriptions.push(this.showVirtualCohort.subscribe((flag) => {
            this.showVirtualCohortFlag = flag;
        }));

        this.subscriptions.push(this.searchSummaryService.results.subscribe(v => {
            this.variantsSummary = v.variants;
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.searchService.results.subscribe(v => {
            this.variants = v.variants;
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.searchBarService.cohort.subscribe((cohort) => {
            this.selectedCohort = cohort;
        }));

        this.subscriptions.push(this.searchService.errors.subscribe((e) => {
            this.errorEvent.emit(e);
        }));

        this.loadingVariantsSummary = true;

        this.autocompleteSummary.searchSummary(this.searchSummaryService, this.searchBarService.options)
            .then(() => {
                this.loadingVariantsSummary = false;
                this.cd.detectChanges();
            })
            .catch((e) => {
                this.loadingVariantsSummary = false;
                this.errorEvent.emit(e);
            });

        this.loadingVariants = true;

        this.autocomplete.search(this.searchService, this.searchBarService.options)
            .then(() => {
                this.loadingVariants = false;
                this.cd.detectChanges();
            })
            .catch((e) => {
                this.loadingVariants = false;
                this.errorEvent.emit(e);
            });
        

    }

    ngAfterViewInit() {
        this.clinicalFilteringService.setShowFilter(false);
        
        this.route.params.subscribe(p => {
            if (p['demo']) {
                this.selectedTabIndex = 1;
                this.clinicalFilteringService.setShowFilter(true);
                this.showClinicalFilters();
            }
        });
    }

    ngOnDestroy() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    showGeneInformation() {
        return !this.searchSummaryService.hasMoved() && this.autocompleteSummary.result instanceof Gene;
    }

    showRegionInformation() {
        return this.searchSummaryService.hasMoved() || this.autocompleteSummary.result instanceof Region;
    }

    // workaround because dc.js is not playing nice with angular and material tabs
    // in particular dc.js is trying to access an element with is not available
    // ngAfterViewInit in the clinical-chart
    showClinicalFilters() {
        const c = document.getElementsByClassName('clinical-filters');
        if (c.length) {
            this.showClin = true;
        } else {
            this.timeout = window.setTimeout(() => {
                this.showClinicalFilters();
            }, 200)
        }
    }

    goToSmallerRegion() {
        const obj = {query: this.searchService.getSmallerRegionString(), timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }

    tabSelected(v) {
        if (v.index === 1) {
            this.clinicalFilteringService.setShowFilter(true);
            this.showVirtualCohort.next(true);
            this.showClinicalFilters();
        }else{
            this.showVirtualCohort.next(false);
            this.clinicalFilteringService.setShowFilter(false);
        }
    }
}
