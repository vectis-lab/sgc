import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { MAXIMUM_NUMBER_OF_VARIANTS } from '../../../services/cttv-service';

import { VariantSearchService } from '../../../services/variant-search-service';
import { VariantTrackService } from '../../../services/genome-browser/variant-track-service';
import { SampleSearch } from '../../../services/sample-search.service';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantAutocompleteResult, VariantSummaryAutocompleteResult } from '../../../model/autocomplete-result';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

@Component({
    selector: 'app-clinical-filtering',
    templateUrl: './clinical-filtering.component.html',
    styleUrls: ['./clinical-filtering.component.css'],
    providers: [VariantSearchService, VariantTrackService]
})
export class ClinicalFilteringComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() autocomplete: VariantAutocompleteResult<any>;
    @Input() autocompleteSummary: VariantSummaryAutocompleteResult<any>;
    @Output() errorEvent = new EventEmitter();
    private geneFilter = [];
    public variants: Variant[] = [];
    public loadingVariants = false;
    private subscriptions: Subscription[] = [];
    maximumNumberOfVariants = MAXIMUM_NUMBER_OF_VARIANTS;
    selectedTabIndex = 0;
    timeout = null;
    selectedCohort = "";


    constructor(public searchService: VariantSearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private router: Router,
                private route: ActivatedRoute,
                private clinicalFilteringService: ClinicalFilteringService,
                private sampleSearch: SampleSearch
            ) {
    }

    ngOnInit(): void {
        this.variants = this.searchService.variants;

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

        this.subscriptions.push(this.sampleSearch.genesFilter.subscribe((genes) => {
            this.geneFilter = genes;
        }));

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
    }

    ngOnDestroy() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    goToSmallerRegion() {
        const obj = {query: this.searchService.getSmallerRegionString(), timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }
}
