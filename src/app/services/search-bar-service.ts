import { Injectable } from '@angular/core';
import { RegionService } from './autocomplete/region-service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SearchOption } from '../model/search-option';
import { Router, Params } from '@angular/router';
import { AutocompleteService } from './autocomplete/autocomplete-service';
import { GenericAutocompleteResult, VariantAutocompleteResult } from '../model/autocomplete-result';
import { ElasticGeneSearch } from './autocomplete/elastic-gene-search-service';
import { PositionService } from './autocomplete/position-service';
import { of, Observable, combineLatest } from "rxjs";
import * as GenePanels from '../shared/genePanels';

export const QUERY_LIST_ERROR = "You query is incorrect. Please check your query and try again"

@Injectable()
export class SearchBarService {
    query = '';
    panel='';
    autocompleteServices: AutocompleteService<any>[] = [];
    options: SearchOption[];
    autocompleteError = '';
    searchedEvent = new Subject();

    private startGreaterThanEndSource = new BehaviorSubject<boolean>(false);
    startGreaterThanEnd = this.startGreaterThanEndSource.asObservable();

    private geneListSource = new BehaviorSubject<string>('');
    geneList = this.geneListSource.asObservable();

    constructor(private geneService: ElasticGeneSearch,
                private regionService: RegionService,
                private positionService: PositionService,
                private router: Router) {
        this.autocompleteServices = [
            regionService,
            positionService,
            geneService
        ];

        this.autocompleteError = '';
        this.query = '';
        this.options = [
            new SearchOption('Cohort', 'dataset', ['Mitochondria', 'Neuromuscular', 'Acutecare'], 'Mitochondria'),
        ];
    }

    searchWithParams(params: Params): Promise<VariantAutocompleteResult<any>> {
        const query = params['query'];
        const cohort = params['cohort'];
        if (!query) {
            return <any>Promise.resolve();
        }
        this.parseOptions(params);

        if (!this.query) {
            this.query = query;
        }

        this.searchedEvent.next();

        const handleAutocompleteError = (e: string): Promise<any> => {
            this.autocompleteError = e;
            return Promise.reject(e);
        };

        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            if (v.length <= 0) {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }
            if(this.checkErrorRegion(query)){
                return handleAutocompleteError('Start position cannot be greater than end');
            }
            const bestMatch = v[0];
            if (bestMatch.match(query)) {
                return bestMatch;
            } else {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }

        });

    }

    verifyQuery(query: string): Promise<boolean>{
        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            const bestMatch = v[0];
            if(v[0]){
                if (this.checkErrorRegion(query)) {
                    return false;
                } else if(bestMatch.match(query)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
            

        });

    }

    searchWithMultipleParams(params: Params): Promise<VariantAutocompleteResult<any>[]> {
        const query = params['query'];
        const panel = params['panel'];
        const cohort = params['cohort'];

        if (!query && !panel) {
            return <any>Promise.resolve();
        }
        this.parseOptions(params);

        if (!this.query) {
            this.query = query;
        }

        if (!this.panel) {
            this.panel = panel;
        }

        this.searchedEvent.next();

        const handleAutocompleteError = (e: string): Promise<any> => {
            this.autocompleteError = e;
            return Promise.reject(e);
        };

        let arrayOfQueries = [];

        if(query.length){
            arrayOfQueries = query.split(',');
        }

        let genes;
        if(GenePanels[panel]){
            genes = GenePanels[panel].join();
        }

        if(panel.length){
            const genePanelsQueries = genes.split(',');
            arrayOfQueries = arrayOfQueries.concat(genePanelsQueries);
        }

        const queries = arrayOfQueries.map(q => this.searchAutocompleteServices(q).take(1).toPromise())

        return <any>Promise.all(queries).then(v => {
            const bestMatches = v.map(q => q[0]);
            return bestMatches;
        });

    }

    setGeneList(value){
        this.geneListSource.next(value);
    }

    checkErrorRegion(query){
        const results = new RegExp(/^([\dxy]+|mt+)[:\-\.,\\/](\d+)[:\-\.,\\/](\d+)$/, "i").exec(query);
        const checkChromosome = new RegExp(/^([\dxy]+|mt+)$/, "i")
        if(results !== null) {
            const chromosome = results[1];
            const start = Number(results[2]);
            const end = Number(results[3]);
            if(checkChromosome.test(chromosome) && !isNaN(start) && !isNaN(end)){
                if(start > end){
                    return true;
                }
            }
        }else{
            return false;
        }
    }

    parseOptions(params: Params) {
        this.options.forEach(o => {
            if (params[o.key]) {
                o.setValue(params[o.key]);
            }
        });
    }

    search(query: string): void {
        this.query = query;
        this.navigateToSearch(query);
    }

    searchAutocompleteServices(term: string): Observable<VariantAutocompleteResult<any>[]> {
        return combineLatest(...this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).catch(e => of<GenericAutocompleteResult<any>[]>([]));
        }), this.combineStreams);
    }

    searchAutocompleteServicesStartsWith(term: string, startsWith: any[] = []): Observable<GenericAutocompleteResult<any>[]> {
        if(this.checkErrorRegion(term)){
            this.startGreaterThanEndSource.next(true);
        }else{
            this.startGreaterThanEndSource.next(false);
        }

        return combineLatest(this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).startWith(startsWith).catch(e => of([]));
        }), this.combineStreams);
    }

    displayDescription(desc: string) {
        if (!desc) {
            return '';
        } else {
            const results = desc.match(/(.*)\s\[Source:.*;Acc:.*\]$/);
            if (results) {
                return results[1];
            } else {
                return desc;
            }
        }
    }

    private navigateToSearch(query: string) {
        const obj = {query: query, timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }

    private combineStreams(...streams) {
        return [].concat.apply([], streams);
    }
}

