import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { VariantSummary } from '../model/variant-summary';
import { Subject } from 'rxjs/Subject';
import { SearchQuery } from '../model/search-query';
import { VariantSearch } from '../shared/variant-search';
import { VariantSummaryRequest } from '../model/variant-summary-request';
import { Region } from '../model/region';
import { of, Observable } from "rxjs";

const DEBOUNCE_TIME = 100;

@Injectable()
export class VariantSummarySearchService {
    variants: VariantSummary[] = [];
    results: Observable<VariantSummaryRequest>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQuery;
    startingRegion: Region;
    filter: any = null;
    private searchQuery = new Subject<SearchQuery>();
    private variantSearch = new VariantSearch();

    constructor(private vsal: VsalService) {
        this.results = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQuery) => {
                return this.vsal.getVariantsSummary(query).map((vr: VariantSummaryRequest) => { 
                    if (this.filter) {
                        vr.variants = this.filter(vr.variants);
                    }
                    return vr;
                });
            })
            .catch(e => {
                this.errors.next(e);
                return of<VariantSummaryRequest>(new VariantSummaryRequest([], e));
            })
            .share();
        this.results.subscribe((cs) => {
            if (!this.startingRegion) {
                this.startingRegion = new Region(this.lastQuery.chromosome, this.lastQuery.start, this.lastQuery.end);
            }
            this.variants = cs.variants;
            this.commenced = true;
        });
    }

    getVariants(query: SearchQuery): Promise<VariantSummary[]> {
        this.lastQuery = query;
        return this.variantSearch.getVariants(query, this.lastQuery, this.results, this.errors, this.searchQuery)
    }

    getCurrentRegion = (): Region => this.variantSearch.getCurrentRegion(this.lastQuery);


    getSmallerRegionString= () => this.variantSearch.getSmallerRegionString(this.lastQuery);

    hasMoved = () => {
        return this.variantSearch.hasMoved(this.startingRegion, this.lastQuery)
    };
}

