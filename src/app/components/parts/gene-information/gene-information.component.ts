import { Component, OnInit, Input } from '@angular/core';
import { VariantSummarySearchService } from '../../../services/variant-summary-search-service';
import { VariantSummary } from '../../../model/variant-summary';
import { SearchBarService } from '../../../services/search-bar-service';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';

@Component({
    selector: 'app-gene-information',
    templateUrl: './gene-information.component.html',
    styleUrls: ['./gene-information.component.css', '../../../shared/meta-information.css']
})
export class GeneInformationComponent implements OnInit {
    @Input() variants: VariantSummary[];
    @Input() autocomplete: GenericAutocompleteResult<Gene>;

    constructor(public searchService: VariantSummarySearchService,
                public searchBarService: SearchBarService) {
    }

    ngOnInit() {

    }

    geneLocation(gene: Gene) {
        let r = new Region(gene.chromosome, gene.start, gene.end);
        return r.name();
    }

}
