import { Injectable } from '@angular/core';
import { VariantSummary } from '../model/variant-summary';
import SearchApi from 'js-worker-search';
import { isUndefined } from 'util';
import { TableSummaryService } from './table-summary-service';
import { FilterSharedService, FilterOperator, COMMAND_TOKEN } from '../shared/filter-shared-service';


@Injectable()
export class FilterSummaryService {
    filterSharedService = new FilterSharedService();

    private searchApi: any;

    constructor(public ts: TableSummaryService) {
        this.searchApi = new SearchApi();
        this.keys().sort().forEach((k) => {
            this.searchApi.indexDocument(k, COMMAND_TOKEN + k);
        });

        this.filterSharedService.operators.forEach((op) => {
            this.searchApi.indexDocument(op, op);
        });
    }

    keys= () => this.filterSharedService.keys(this.ts);

    isValidCommand = (s: string): boolean => this.filterSharedService.isValidCommand(s, this.ts);

    nextTokens = (s: string): Promise<string[]> => this.filterSharedService.nextTokens(s, this.searchApi, this.ts);

    isCommand = (s: string) => this.filterSharedService.isCommand(s);

    filterVariants = (command: string, variants: VariantSummary[]) => this.filterSharedService.filterVariants(command, variants, this.ts);

    filter = (command: string, op: FilterOperator, value: string | number, variants: VariantSummary[]) => this.filterSharedService.filter(command, op, value, variants, this.ts);

    clean = (s: string): string => this.filterSharedService.clean(s, this.ts);

}
