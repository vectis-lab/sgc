import { Observable } from 'rxjs';
import { Variant } from '../model/variant';
import { SearchQueries } from '../model/search-query';
import { Region } from '../model/region';
import { empty } from "rxjs";

export class MockVariantSearchService {
    variants: Observable<any> = empty();
    results: Observable<any> = empty();
    updates: Observable<any> = empty();
    lastQuery: SearchQueries = new SearchQueries([new Region('1', 1, 2)], []);
    options: any[] = [];

    getVariants() {
        return Promise.resolve([]);
    }

    currentResult(): Variant[] {
        return [];
    }

    getCurrentRegion() {
        return new Region('1', 1, 2);
    }

}
