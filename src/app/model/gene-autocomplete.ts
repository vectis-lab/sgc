import { Variant } from './variant';
import { VariantSummary } from './variant-summary';
import { GenericAutocompleteResult } from './autocomplete-result';
import { Gene } from './gene';
import { VariantSearchService } from '../services/variant-search-service';
import { VariantSummarySearchService } from '../services/variant-summary-search-service';
import { SearchOption } from './search-option';
import { SearchQuery } from './search-query';
import { Region } from './region';

export class GeneAutocomplete extends GenericAutocompleteResult<Gene> {

    search(vsal: VariantSearchService, options: SearchOption[]): Promise<Variant[]> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return vsal.getVariants(new SearchQuery(gene.chromosome, gene.start, gene.end, options));
        }).catch(e => e);
    }

    searchSummary(vsal2: VariantSummarySearchService, options: SearchOption[]): Promise<VariantSummary[]> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return vsal2.getVariants(new SearchQuery(gene.chromosome, gene.start, gene.end, options));
        }).catch(e => e);
    }

    region(): Promise<Region> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return new Region(gene.chromosome, gene.start, gene.end);
        }).catch(e => e);
    }

    displayName() {
        return this.result.symbol;
    }

    categoryName() {
        return 'Gene';
    }

    match(query: string) {
        let queryTrimmed = new RegExp(query.trim(), 'i');
        return queryTrimmed.exec(this.symbol) !== null || queryTrimmed.exec(this.result.symbol) !== null;
    }
}
