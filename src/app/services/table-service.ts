import { Variant } from '../model/variant';

export class TableService {

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
        'Location': (v: Variant) => v.s,
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

    private tooltips: any = {
        'Allele Freq': () => this.showScales ? 'Allele frequency on a discrete scale: <1/10000, <1/1000, <1%, <5%, <50% and >50%' : ''
    };

    private lastSortedLabel = '';
    private lastSortedOrder = true;

    constructor() {

    }

    tooltip(key) {
        return this.tooltips[key] ? this.tooltips[key]() : '';
    }

    display(label: string, variant: Variant): string {
        return this.displayMap[label](variant) ? String(this.displayMap[label](variant)) : '';
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
        return Array.from(this.columns.keys());
    }

    get(k: string) {
        return this.columns.get(k);
    }

    set(k: string, v: boolean) {
        this.columns.set(k, v);
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
        const ac: string[] = [];
        this.columns.forEach((v, k) => {
            if (v) {
                ac.push(k);
            }
        });
        return ac;
    }

    private locationString(variant: Variant) {
        return `${variant.c} : ${variant.s}`;
    }
}
