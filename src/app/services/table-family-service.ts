import { Variant } from '../model/variant';
import { TableSharedService } from '../shared/table-service';

export class TableFamilyService {
    private tableService = new TableSharedService();
    showScales = true;
    samples = [];

    private displayMap: any= {
        'Location': (v: Variant) => this.locationString(v),
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
        'Gene': (v: Variant) => v.geneSymbol,
    };


    private searchResultKeys: any[]= [
        ['Location', true],
        ['Reference', true],
        ['Alternate', true],
        ['Gene', true],
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    public sortMap: any = {
        'Location': (v: Variant) => v.s,
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
        'Gene': (v: Variant) => v.geneSymbol,
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
        if(typeof v[`vhetc${i}`] === 'undefined'){
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
            ['Reference', true],
            ['Alternate', true],
            ['Gene', true],
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        this.displayMap = {
            'Location': (v: Variant) => this.locationString(v),
            'Reference': (v: Variant) => v.r,
            'Alternate': (v: Variant) => v.a,
            'Gene': (v: Variant) => v.geneSymbol,
        };

        this.searchResultKeys = [
            ['Location', true],
            ['Reference', true],
            ['Alternate', true],
            ['Gene', true],
        ];

        this.sortMap =  {
            'Location': (v: Variant) => v.s,
            'Reference': (v: Variant) => v.r,
            'Alternate': (v: Variant) => v.a,
            'Gene': (v: Variant) => v.geneSymbol,
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
