import { Variant } from '../model/variant';
import { TableSharedService } from '../shared/table-service';

export class TableFamilyService {
    private tableService = new TableSharedService();
    showScales = true;

    private displayMap: any = {
        'Location': (v: Variant) => this.locationString(v),
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
        'Affected Sample': (v: Variant) => this.familyHetHomDisplay(v,''),
        'Family 1': (v: Variant) => this.familyHetHomDisplay(v,1),
        'Family 2': (v: Variant) => this.familyHetHomDisplay(v,2),
        'Family 3': (v: Variant) => this.familyHetHomDisplay(v,3),
    };

    private searchResultKeys: any[] = [
        ['Location', true],
        ['Reference', true],
        ['Alternate', true],
        ['Affected Sample' , true],
        ['Family 1' , true],
        ['Family 2' , true],
        ['Family 3' , true]
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    readonly sortMap: any = {
        'Location': (v: Variant) => v.s,
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
        'Affected Sample': (v: Variant) => v.vhetc,
        'Family 1': (v: Variant) => v.vhetc1,
        'Family 2': (v: Variant) => v.vhetc2,
        'Family 3': (v: Variant) => v.vhetc3,
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
        return this.tableService.sort(label, variants, this.lastSortedLabel, this.sortMap, this.lastSortedOrder);
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
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        return this.tableService.activeColumns(this.columns);
    }

    private locationString(variant: Variant) {
        return `${variant.c} : ${variant.s}`;
    }
}
