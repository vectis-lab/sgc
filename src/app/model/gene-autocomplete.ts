import { Variant } from './variant';
import { VariantSummary } from './variant-summary';
import { GenericAutocompleteResult } from './autocomplete-result';
import { Gene } from './gene';
import { VariantSearchService } from '../services/variant-search-service';
import { SampleSearch } from '../services/sample-search.service';
import { VariantSummarySearchService } from '../services/variant-summary-search-service';
import { SearchOption } from './search-option';
import { SearchQueries } from './search-query';
import { Region } from './region';

export class GeneAutocomplete extends GenericAutocompleteResult<Gene> {

    /*search(ss: SampleSearch, vsal: VariantSearchService, options: SearchOption[]): Promise<Variant[]> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return ss.getSamples(new SearchQuery(gene.chromosome, gene.start, gene.end, options)).then(() => {
                return vsal.getVariants(new SearchQuery(gene.chromosome, gene.start, gene.end, options))
            });
        }).catch(e => e);
    }*/

    getRegion(): Promise<Region> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return new Region(gene.chromosome, gene.start, gene.end);
        });
    }

    searchSummary(vsal2: VariantSummarySearchService, options: SearchOption[]): Promise<VariantSummary[]> {
        return this.autocompleteService.getDetails(this).toPromise().then((gene: Gene) => {
            return vsal2.getVariants(new SearchQueries([new Region(gene.chromosome, gene.start, gene.end)], options));
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
