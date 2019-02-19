import { Component, OnDestroy, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../../services/search-bar-service';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackbarDemoComponent } from '../../parts/snackbar-demo/snackbar-demo.component';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Mitochondria, Neuromuscular } from '../../../shared/cohortAuthor';

const SMALL_WIDTH = 720;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements  OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    sbSub: Subscription = null;
    autocomplete: GenericAutocompleteResult<any>;
    error = '';
    searching = false;
    sb: MatSnackBarRef<SnackbarDemoComponent> = null;
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH}px)`);
    showFilter: boolean;
    selectedOption: string;
    authors = [];

    constructor(public searchBarService: SearchBarService,
                public auth: Auth,
                private route: ActivatedRoute,
                private cd: ChangeDetectorRef,
                public snackBar: MatSnackBar,
                private router: Router,
                private clinicalFilteringService: ClinicalFilteringService
            ) {
        if (auth.authenticated()) {
            this.subscriptions.push(route.params.subscribe(p => this.parseParams(p)));
        }
    }
    ngOnInit(): void {
        this.clinicalFilteringService.setShowFilter(false);
        this.subscriptions.push(this.clinicalFilteringService.showFilter.subscribe(flag =>{
            this.showFilter = flag;
        }))

        this.subscriptions.push(this.searchBarService.cohort.subscribe(cohort =>{
            this.selectedOption = cohort;
            if(cohort === "Mitochondria"){
                this.authors = Mitochondria;
            }else if(cohort === "Neuromuscular"){
                this.authors = Neuromuscular;
            }
        }))

        this.selectedOption = this.searchBarService.options[0].getValue();

        this.auth.getSavedSearches().subscribe(savedSearches => {
            this.clinicalFilteringService.initSaveSearches(savedSearches);
        })

        this.auth.getUserPermissions().subscribe(permissions => {
            this.auth.setUserPermissions(permissions);
        })
        }

    parseParams(params: Params) {
        if (!params['query']) {
            return;
        }
        if (params['demo']) {
            this.sb = this.snackBar.openFromComponent(SnackbarDemoComponent, {
                extraClasses: ['snack-bar-demo-container'],
                verticalPosition: 'top'
            });
            this.sbSub = this.sb.afterDismissed().subscribe(() => {
                this.searchBarService.search(params['query']);
            });
        } else {
            this.dismissSnackBar();
        }
        this.error = '';
        this.autocomplete = null;
        this.searching = true;
        this.searchBarService.searchWithParams(params).then((v) => {
            this.autocomplete = v;
            this.cd.detectChanges();
        }).catch(() => {
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
        this.clinicalFilteringService.clearFilters();
        this.dismissSnackBar();
    }

    handleError(e: string) {
        this.error = e;
    }

    isSmallScreen(): boolean {
        return this.mediaMatcher.matches;
    }

    private dismissSnackBar() {
        if (this.sb) {
            this.sbSub.unsubscribe();
            this.sbSub = null;
            this.sb.dismiss();
            this.sb = null;
        }
    }
}