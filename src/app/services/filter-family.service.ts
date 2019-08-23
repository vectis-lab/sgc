import { Injectable } from '@angular/core';
import { Variant } from '../model/variant';
import SearchApi from 'js-worker-search';
import { isUndefined } from 'util';
import { TableFamilyService } from './table-family-service';
import { FilterSharedService, FilterOperator, COMMAND_TOKEN } from '../shared/filter-shared-service';

const SLASH_INDEX = 1;
const COMMAND_INDEX = 2;
const OP_INDEX = 3;
const VALUE_INDEX = 4;


@Injectable()
export class FilterFamilyService {
    filterSharedService = new FilterSharedService();

    private searchApi: any;

    constructor(public ts: TableFamilyService) {
        this.searchApi = new SearchApi();
        this.keys().sort().forEach((k) => {
            this.searchApi.indexDocument(k, COMMAND_TOKEN + k);
        });

        this.filterSharedService.operators.forEach((op) => {
            this.searchApi.indexDocument(op, op);
        });
    }

    private parseCommand(command: string): RegExpMatchArray {
        if (!this.isCommand(command)) {
            return [];
        }
        return command.match(this.regex());
    }

    private regex(): RegExp {
        const s = `(\/)(?:.*(${ this.keys().join('|') })(?:.*?((?:!=)|[<>=])([^!<>=\n]*))*)*`;
        return new RegExp(s, 'i');
    }

    keys= () => this.filterSharedService.keys(this.ts);

    isValidCommand = (s: string): boolean => this.filterSharedService.isValidCommand(s, this.ts);

    nextTokens = (s: string): Promise<string[]> => this.filterSharedService.nextTokens(s, this.searchApi, this.ts);

    isCommand = (s: string) => this.filterSharedService.isCommand(s);

    filterVariants = (command: string, variants: Variant[]) => {
        if (!this.isValidCommand(command)) {
            return variants;
        }
        let  args = this.parseCommand(command);
        if(!['Location', 'Reference', 'Alternate'].includes(args[2])){
            if(args[4] === 'het'){
                args[4] = '1';
            }else if(args[4] === 'hom'){
                args[4] = '0';
            }else{
                args[4] = '2';
            }
        }

        return this.filter(args[COMMAND_INDEX], <FilterOperator>args[OP_INDEX], args[VALUE_INDEX], variants);
    };

    filter = (command: string, op: FilterOperator, value: string | number, variants: Variant[]) => {
        if (!command) {
            return variants;
        }
        return variants.filter(v => {
            let a = this.ts.sortMap[command](v);
            if (a === null || isUndefined(a)) {
                a = '';
            }
            switch (op) {
                case '<':
                    return a < value;
                case '>':
                    return a > value;
                case '=':
/* tslint:disable */
                    return a == value;
                case '!=':
                    return a != value;
/* tslint:enable */
                default:
                    return true;
            }
        });
    };

    clean = (s: string): string => this.filterSharedService.clean(s, this.ts);


}
