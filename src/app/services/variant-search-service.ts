import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { Variant } from '../model/variant';
import { Subject } from 'rxjs/Subject';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { Region } from '../model/region';
import { of, Observable } from "rxjs";
import { VariantSearch } from '../shared/variant-search';


const DEBOUNCE_TIME = 100;

@Injectable()
export class VariantSearchService {
    variants: Variant[] = [];
    results: Observable<VariantRequest>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQuery[];
    startingRegion: Region;
    filter: any = null;
    samples: string = "";
    private searchQuery = new Subject<SearchQuery[]>();
    private variantSearch = new VariantSearch();

    constructor(private vsal: VsalService
    ) {
        this.results = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQuery[]) => {
                return this.vsal.getVariants(query, this.samples).map((vr: VariantRequest) => {
                    if (this.filter) {
                        vr.variants = this.filter(vr.variants);
                    }
                    return vr;
                });
            })
            .catch(e => {
                this.errors.next(e);
                return of<VariantRequest>(new VariantRequest([], e));
            })
            .share();

        this.results.subscribe((cs) => {
            this.variants = cs.variants;
            this.commenced = true;
        });
    }

    getVariants(query: SearchQuery[], samples): Promise<Variant[]> { 
        this.lastQuery = query;
        this.samples = samples;
        const promise = new Promise<any[]>((resolve, reject) => {
            this.results.take(1).subscribe(
                (vr: VariantRequest) => {
                    if (vr.error) {
                        this.errors.next(vr.error);
                        resolve([]);
                        return;
                    }
                    resolve(vr.variants);
                },
                (e: any) => {
                    this.errors.next(e);
                    resolve([]);
                }
            );
        });
        this.searchQuery.next(query);
        return promise;
    }

    

    getCurrentRegion = (): Region => this.variantSearch.getCurrentRegion(this.lastQuery);


    getSmallerRegionString= () => this.variantSearch.getSmallerRegionString(this.lastQuery);
}

