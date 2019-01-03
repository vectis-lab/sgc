import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from 'rxjs/Subject';
import { Auth } from './auth-service';
import { environment } from '../../environments/environment';

@Injectable()
export class ClinicalFilteringService implements OnDestroy {
    private filtersSource = new BehaviorSubject<any>({});
    filters = this.filtersSource.asObservable();
    chart: any;
    
    private savedSearchesSource = new BehaviorSubject<any>({});
    savedSearches = this.savedSearchesSource.asObservable();

    private savedSearchesNameSource = new Subject<string>();
    savedSearchesName = this.savedSearchesNameSource.asObservable();

    private showFilterSource = new BehaviorSubject<boolean>(false);
    showFilter = this.showFilterSource.asObservable();


    constructor(private auth: Auth) {
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
    }

    initSaveSearches(savedSearches){
        this.savedSearchesSource.next(savedSearches);
    }

    saveSearches(name){
        let currentSavedSearches = Object.assign({}, this.savedSearchesSource.getValue());
        let currentFilter = Object.assign({}, this.filtersSource.getValue());
        currentSavedSearches[name] = currentFilter;
        this.auth.getToken().subscribe(token => {
            this.auth.updateSavedSearches(token, currentSavedSearches).subscribe(savedSearches => {
                this.savedSearchesSource.next(currentSavedSearches);
            })
        })
    }

    deleteSaveSearches(name){
        let currentSavedSearches = Object.assign({}, this.savedSearchesSource.getValue());
        delete currentSavedSearches[name];
        this.auth.getToken().subscribe(token => {
            this.auth.updateSavedSearches(token, currentSavedSearches).subscribe(savedSearches => {
                this.savedSearchesSource.next(currentSavedSearches);
            })
        })
    }

    applySavedSearches(savedFilterName) {
        let savedSearches = Object.assign({}, this.savedSearchesSource.getValue()[savedFilterName]);
        this.filtersSource.next(savedSearches);
        this.savedSearchesNameSource.next(savedFilterName);
    }

    setShowFilter(bool){
        this.showFilterSource.next(bool);
    }


    ngOnDestroy() {
        this.filtersSource.next({})
    }
}
