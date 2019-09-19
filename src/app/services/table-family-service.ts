import { Variant } from '../model/variant';
import { TableSharedService } from '../shared/table-service';

export class TableFamilyService {
    private tableService = new TableSharedService();
    showScales = true;
    samples = [];

    private displayMap: any= {
        'Location': (v: Variant) => this.locationString(v),
        'Gene': (v: Variant) => v.geneSymbol,
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
    };


    private searchResultKeys: any[]= [
        ['Location', true],
        ['Gene', true],
        ['Reference', true],
        ['Alternate', true],
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    public sortMap: any = {
        'Location': (v: Variant) => {
            if(Number(v.c)){
                return Number(v.c) * 10000000000 + v.s;
            }else if(v.c === 'X'){
                return 23 * 10000000000 + v.s;
            }else if(v.c === 'Y'){
                return 24 * 10000000000 + v.s;
            }else if(v.c === 'MT'){
                return 25 * 10000000000 + v.s;
            }
        },
        'Gene': (v:Variant) => v.geneSymbol,
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
    };

    private tooltips = this.tableService.afTooltips(this.showScales);

    private lastSortedLabel = '';
    private lastSortedOrder = true;

    constructor() {
    }

    tooltip(key) {
        return this.tableService.tooltip(key, this.tooltips);
    }

    display(label: string, variant: Variant): string {
        return this.tableService.display(label, variant, this.displayMap);
    }

    sort(label: string, variants: Variant[]) {
        if (this.lastSortedLabel === label) {
            this.lastSortedOrder = !this.lastSortedOrder;
        } else {
            this.lastSortedLabel = label;
            this.lastSortedOrder = true;
        }
        const fn = this.sortMap[label];
        if (this.lastSortedOrder) {
            variants.sort((a: any, b: any) => {
                if (fn(a) < fn(b)) {
                    return -1;
                } else if (fn(a) > fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            variants.sort((a: any, b: any) => {
                if (fn(a) > fn(b)) {
                    return -1;
                } else if (fn(a) < fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    keys() {
        return this.tableService.keys(this.columns);
    }

    get(k: string) {
        return this.tableService.get(k, this.columns);
    }

    set(k: string, v: boolean) {
        this.tableService.set(k, v, this.columns);
    }

    familyHetHomDisplay(v: Variant, i){
        if(v[`vhetc${i}`] === -1){
            return 'ref'
        }
        else if(v[`vhetc${i}`] === 0){
            return 'hom'
        }else if(v[`vhetc${i}`] === 1){
            return 'het'
        }
    }

    minimalView() {
        const keys: any[] = [
            ['Location', true],
            ['Gene', true],
            ['Reference', true],
            ['Alternate', true],
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        this.displayMap = {
            'Location': (v: Variant) => this.locationString(v),
            'Gene': (v: Variant) => v.geneSymbol,
            'Reference': (v: Variant) => v.r,
            'Alternate': (v: Variant) => v.a,
        };

        this.searchResultKeys = [
            ['Location', true],
            ['Gene', true],
            ['Reference', true],
            ['Alternate', true],
        ];

        this.sortMap =  {
            'Location': (v: Variant) => {
                if(Number(v.c)){
                    return Number(v.c) * 10000000000 + v.s;
                }else if(v.c === 'X'){
                    return 23 * 10000000000 + v.s;
                }else if(v.c === 'Y'){
                    return 24 * 10000000000 + v.s;
                }else if(v.c === 'MT'){
                    return 25 * 10000000000 + v.s;
                }
            },
            'Gene': (v:Variant) => v.geneSymbol,
            'Reference': (v: Variant) => v.r,
            'Alternate': (v: Variant) => v.a,
        };

        this.samples.forEach((s,index) => {
            if(index === 0){
                this.displayMap['Sample '+s] = (v: Variant) => this.familyHetHomDisplay(v,'');
                this.searchResultKeys.push(['Sample '+s, true]);
                this.sortMap['Sample '+s] = (v: Variant) => v.vhetc;
            }else{
                this.displayMap['Family '+s] = (v: Variant) => this.familyHetHomDisplay(v,index)
                this.searchResultKeys.push(['Family '+s, true]);
                this.sortMap['Family '+s] = (v: Variant) => v['vhetc'+index];
            }
        });
        this.columns = new Map<string, boolean>(this.searchResultKeys);
        return this.tableService.activeColumns(this.columns);
    }

    private locationString(variant: Variant) {
        return `${variant.c} : ${variant.s}`;
    }
}
