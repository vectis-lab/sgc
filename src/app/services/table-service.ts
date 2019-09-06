import { Variant } from '../model/variant';
import { TableSharedService } from '../shared/table-service';

export class TableService {
    private tableService = new TableSharedService();
    showScales = true;

    private displayMap: any = {
        'Location': (v: Variant) => this.locationString(v),
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
        'Type': (v: Variant) => v.t,
        'dbSNP': (v: Variant) => v.rs,
        'Homozygotes Count': (v: Variant) => v.homc,
        'Virtual Homozygotes Count': (v: Variant) => v.vhomc,
        'Heterozygotes Count': (v: Variant) => v.hetc,
        'Virtual Heterozygotes Count': (v: Variant) => v.vhetc,
        'Allele Count': (v: Variant) => v.ac,
        'Virtual Allele Count': (v: Variant) => v.vac,
        'Allele Freq': (v: Variant) => v.af.toExponential(4),
        'Virtual Allele Freq': (v: Variant) => v.vaf?v.vaf.toExponential(4):null,
    };

    private searchResultKeys: any[] = [
        ['Location', true],
        ['Reference', true],
        ['Alternate', true],
        ['Type', false],
        ['dbSNP', false],
        ['Homozygotes Count', false],
        ['Virtual Homozygotes Count', false],
        ['Heterozygotes Count', false],
        ['Virtual Heterozygotes Count', false],
        ['Allele Count', true],
        ['Virtual Allele Count', true],
        ['Allele Freq', true],
        ['Virtual Allele Freq', true]
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    readonly sortMap: any = {
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
        'Reference': (v: Variant) => v.r,
        'Alternate': (v: Variant) => v.a,
        'Type': (v: Variant) => v.t,
        'dbSNP': (v: Variant) => v.rs ? v.rs.match(/rs(\d+)/)[1] : 0,
        'Homozygotes Count': (v: Variant) => {
            return v.homc;
        },
        'Virtual Homozygotes Count': (v: Variant) => {
            return v.vhomc;
        },
        'Heterozygotes Count': (v: Variant) => {
            return v.hetc;
        },
        'Virtual Heterozygotes Count': (v: Variant) => {
            return v.vhetc;
        },
        'Allele Count': (v: Variant) => v.ac,
        'Virtual Allele Count': (v: Variant) => v.vac,
        'Allele Freq': (v: Variant) => v.af,
        'Virtual Allele Freq': (v: Variant) => v.vaf,
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

    minimalView() {
        const keys: any[] = [
            ['Location', true],
            ['Reference', true],
            ['Alternate', true],
            ['Type', false],
            ['dbSNP', false],
            ['Homozygotes Count', false],
            ['Virtual Homozygotes Count', false],
            ['Heterozygotes Count', false],
            ['Virtual Heterozygotes Count', false],
            ['Allele Count', false],
            ['Virtual Allele Count', false],
            ['Allele Freq', true],
            ['Virtual Allele Freq', true],
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
