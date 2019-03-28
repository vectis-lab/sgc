import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from 'rxjs/Subject';
import { Auth } from './auth-service';
import { environment } from '../../environments/environment';
import { SampleSearch } from './sample-search.service';

@Injectable()
export class ClinicalFilteringService implements OnDestroy {
    private filtersSource = new BehaviorSubject<any>({});
    filters = this.filtersSource.asObservable();
    chart: any;
    
    private savedSearchesSource = new BehaviorSubject<any>({});
    savedSearches = this.savedSearchesSource.asObservable();

    private savedSearchesNameSource = new Subject<string>();
    savedSearchesName = this.savedSearchesNameSource.asObservable();

    constructor(private auth: Auth, private sampleSearch: SampleSearch) {
    }

    setFilters(name, filter){
        let currentFilter = this.filtersSource.getValue();
        let newFilter = Object.assign({}, currentFilter, {[name]: filter});

        if(newFilter[name].length === 0){
            delete newFilter[name];
        }
        this.filtersSource.next(newFilter);
    }

    deleteFilter(name){
        let currentFilter = this.filtersSource.getValue();
        let newFilter = Object.assign({}, currentFilter);
        delete newFilter[name];
        this.filtersSource.next(newFilter);
    }

    clearFilters(){
        this.filtersSource.next({});
        this.sampleSearch.clearGeneFilter();
    }

    initSaveSearches(savedSearches){
        this.savedSearchesSource.next(savedSearches);
    }

    saveSearches(cohort, name){
        let currentSavedSearches = Object.assign({}, this.savedSearchesSource.getValue());
        
        let currentFilter = Object.assign({}, this.filtersSource.getValue());
        currentSavedSearches[cohort][name] = currentFilter;
        this.auth.updateSavedSearches(currentSavedSearches).subscribe(savedSearches => {
            this.savedSearchesSource.next(currentSavedSearches);
        })
    }

    deleteSaveSearches(cohort, name){
        let currentSavedSearches = Object.assign({}, this.savedSearchesSource.getValue());
        delete currentSavedSearches[cohort][name];
        this.auth.updateSavedSearches(currentSavedSearches).subscribe(savedSearches => {
            this.savedSearchesSource.next(currentSavedSearches);
        })
    }

    applySavedSearches(cohort, savedFilterName) {
        let savedSearches = Object.assign({}, this.savedSearchesSource.getValue()[cohort][savedFilterName]);
        this.filtersSource.next(savedSearches);
        this.savedSearchesNameSource.next(savedFilterName);
    }

    ngOnDestroy() {
        this.filtersSource.next({})
    }
}
