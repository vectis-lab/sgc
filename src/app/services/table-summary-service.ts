import { VariantSummary } from '../model/variant-summary';
import { TableSharedService } from '../shared/table-service';

export class TableSummaryService {
    private tableService = new TableSharedService();
    showScales = true;

    private displayMap: any = {
        'Location': (v: VariantSummary) => this.locationString(v),
        'Reference': (v: VariantSummary) => v.ref,
        'Alternate': (v: VariantSummary) => v.alt,
        'Type': (v: VariantSummary) => v.type,
        'dbSNP': (v: VariantSummary) => v.rsid,
        'Homozygotes Count': (v: VariantSummary) => v.nHomVar,
        'Heterozygotes Count': (v: VariantSummary) => v.nHet,
        'Allele Count': (v: VariantSummary) => v.ac,
        'Allele Freq': (v: VariantSummary) => v.af.toExponential(4),
        'cato': (v: VariantSummary) => v.cato,
        'eigen': (v: VariantSummary) => v.eigen,
        'sift': (v: VariantSummary) => v.sift,
        'polyPhen': (v: VariantSummary) => v.polyPhen,
        'tgpAF': (v: VariantSummary) => v.tgpAF,
        'hrcAF': (v: VariantSummary) => v.hrcAF,
        'GnomadAF': (v: VariantSummary) => v.gnomadAF,
        'consequences': (v: VariantSummary) => v.consequences,
        'gene': (v: VariantSummary) => v.geneSymbol,
        'clinvar': (v: VariantSummary) => v.clinvar
    };

    private searchResultKeys: any[] = [
        ['Location', true],
        ['Reference', true],
        ['Alternate', true],
        ['Type', true],
        ['dbSNP', false],
        ['Homozygotes Count', false],
        ['Heterozygotes Count', false],
        ['Allele Count', false],
        ['cato', false],
        ['eigen', false],
        ['sift', false],
        ['polyPhen', false],
        ['tgpAF', false],
        ['hrcAF', false],
        ['consequences', true],
        ['gene', false],
        ['clinvar', false],
        ['GnomadAF', true],
        ['Allele Freq', true]
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    readonly sortMap: any = {
        'Location': (v: VariantSummary) => v.start,
        'Reference': (v: VariantSummary) => v.ref,
        'Alternate': (v: VariantSummary) => v.alt,
        'Type': (v: VariantSummary) => v.type,
        'dbSNP': (v: VariantSummary) => v.rsid ? v.rsid.match(/rs(\d+)/)[1] : 0,
        'Homozygotes Count': (v: VariantSummary) => {
            return v.nHomVar;
        },
        'Heterozygotes Count': (v: VariantSummary) => {
            return v.nHet;
        },
        'Allele Count': (v: VariantSummary) => v.ac,
        'Allele Freq': (v: VariantSummary) => v.af,
        'cato': (v: VariantSummary) => v.cato,
        'eigen': (v: VariantSummary) => v.eigen,
        'sift': (v: VariantSummary) => v.sift ? v.sift : '',
        'polyPhen': (v: VariantSummary) => v.polyPhen ? v.polyPhen : '',
        'tgpAF': (v: VariantSummary) => v.tgpAF,
        'hrcAF': (v: VariantSummary) => v.hrcAF,
        'GnomadAF': (v: VariantSummary) => v.gnomadAF,
        'consequences': (v: VariantSummary) => v.consequences ? v.consequences : '',
        'gene': (v: VariantSummary) => v.geneSymbol ? v.geneSymbol : '',
        'clinvar': (v: VariantSummary) => v.clinvar ? v.clinvar : ''
    };

    private tooltips = this.tableService.afTooltips(this.showScales);

    private lastSortedLabel = '';
    private lastSortedOrder = true;

    constructor() {

    }

    tooltip(key) {
        return this.tableService.tooltip(key, this.tooltips);
    }

    display(label: string, variant: VariantSummary): string {
        return this.tableService.display(label, variant, this.displayMap);
    }

    sort(label: string, variants: VariantSummary[]) {
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
            ['Heterozygotes Count', false],
            ['Missed Genotypes', false],
            ['Allele Count', false],
            ['Allele Freq', true],
            ['cato', false],
            ['eigen', false],
            ['sift', false],
            ['polyPhen', false],
            ['tgpAF', false],
            ['hrcAF', false],
            ['gnomadAF', false],
            ['consequences', false],
            ['gene', false],
            ['clinvar', false]
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        return this.tableService.activeColumns(this.columns);
    }

    private locationString(variant: VariantSummary) {
        return `${variant.chr} : ${variant.start}`;
    }
}