import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { MAXIMUM_NUMBER_OF_VARIANTS } from '../../../services/cttv-service';

import { VariantSearchService } from '../../../services/variant-search-service';
import { SampleSearch } from '../../../services/sample-search.service';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService, QUERY_LIST_ERROR } from '../../../services/search-bar-service';
import { VariantAutocompleteResult } from '../../../model/autocomplete-result';
import { SearchQueries } from '../../../model/search-query';
import { Region } from '../../../model/region';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { ClinapiService } from '../../../services/clinapi.service';
import {COHORT_PERMISSION_VSAL_PHENO_MAPPING, COHORT_PHENO_GET_MAPPING} from '../../../model/cohort-value-mapping'

@Component({
    selector: 'app-clinical-filtering',
    templateUrl: './clinical-filtering.component.html',
    styleUrls: ['./clinical-filtering.component.css'],
    providers: [VariantSearchService, ClinapiService]
})
export class ClinicalFilteringComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() autocomplete: VariantAutocompleteResult<any>[];
    @Output() errorEvent = new EventEmitter();
    private geneFilter = [];
    public variants: Variant[] = [];
    public ids: string[] = [];
    public loadingVariants = false;
    private subscriptions: Subscription[] = [];
    maximumNumberOfVariants = MAXIMUM_NUMBER_OF_VARIANTS;
    timeout = null;
    selectedCohort = this.searchBarService.options[0].getValue();
    pheno: any;
    denied = false;
    error = false;
    mappingSamples = [];


    constructor(public searchService: VariantSearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private router: Router,
                private route: ActivatedRoute,
                private clinicalFilteringService: ClinicalFilteringService,
                private sampleSearch: SampleSearch,
                private auth: Auth,
                public cs: ClinapiService
            ) {
    }

    ngOnInit(): void {
        this.variants = this.searchService.variants;

        this.subscriptions.push(this.searchService.results.subscribe(v => {
            this.variants = v.variants;
            this.cd.detectChanges();
        }));

        this.ids = this.sampleSearch.ids;

        this.subscriptions.push(this.sampleSearch.results.subscribe(s => {
            this.ids = s.samples;
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.searchService.errors.subscribe((e) => {
            this.errorEvent.emit(e);
        }));

        this.subscriptions.push(this.sampleSearch.errors.subscribe((e) => {
            this.errorEvent.emit(e);
        }));

        this.loadingVariants = true;

        const allQueries = this.autocomplete.map(ac => ac.getRegion())

        Promise.all(allQueries).then((regions: Region[]) => {
            this.subscriptions.push(this.auth.getUserPermissions().subscribe(permissions => {
                let permitted = false;
                if(permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[this.selectedCohort])){
                    permitted = true;
                }else{
                    permitted = false;
                }
                this.cs[COHORT_PHENO_GET_MAPPING[this.selectedCohort]](false,permitted).subscribe(pheno => {
                    this.pheno = pheno;
                    return this.sampleSearch.getSamples(new SearchQueries(regions, this.searchBarService.options)).then((result) => {
                        const list_pheno_ids = this.pheno.map(sample => sample.internalIDs)
                        this.mappingSamples = result.filter(r => {
                            return list_pheno_ids.includes(r);
                        })
                        return this.searchService.getVariants(new SearchQueries(regions, this.searchBarService.options), this.mappingSamples.join())
                        .then(() => {
                            this.loadingVariants = false;
                            this.cd.detectChanges();
                        })
                        .catch((e) => {
                            this.loadingVariants = false;
                            this.errorEvent.emit(e);
                        });
                    }).catch((e) => {
                        this.loadingVariants = false;
                        this.errorEvent.emit(e);
                    });
                },
                e => {
                    if (e.status && e.status === 401) {
                        this.denied = true;
                    } else {
                        this.error = e;
                    }
                    this.cd.detectChanges();
                })
            }));
            
        })

        /*this.autocomplete.search(this.sampleSearch, this.searchService, this.searchBarService.options)
            .then(() => {
                this.loadingVariants = false;
                this.cd.detectChanges();
            })
            .catch((e) => {
                this.loadingVariants = false;
                this.errorEvent.emit(e);
            });*/
        

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
