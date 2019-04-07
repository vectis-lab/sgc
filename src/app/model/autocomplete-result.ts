import { Variant } from './variant';
import { VariantSummary } from './variant-summary';
import { VariantSearchService } from '../services/variant-search-service';
import { SampleSearch } from '../services/sample-search.service';
import { VariantSummarySearchService } from '../services/variant-summary-search-service';
import { AutocompleteService } from '../services/autocomplete/autocomplete-service';
import { SearchOption } from './search-option';
import { Region } from './region';
import { SearchQuery } from './search-query';

export abstract class GenericAutocompleteResult<T> {
    constructor(public result: T,
                public symbol: string,
                public description: string,
                public autocompleteService: AutocompleteService<T>) {};

    abstract displayName(): string;
    abstract categoryName(): string;
    abstract match(query: string): boolean;
}

export abstract class VariantAutocompleteResult<T> extends GenericAutocompleteResult<T> {
    //abstract search(ss: SampleSearch, vsal: VariantSearchService, options: SearchOption[]): Promise<Variant[]>;
    abstract region(): Promise<Region>;
    abstract getSearchQueries(options: SearchOption[]): Promise<SearchQuery>;
}

export abstract class VariantSummaryAutocompleteResult<T> extends GenericAutocompleteResult<T> {
    abstract searchSummary(vsal: VariantSummarySearchService, options: SearchOption[]): Promise<VariantSummary[]>;
    abstract region(): Promise<Region>;
}
