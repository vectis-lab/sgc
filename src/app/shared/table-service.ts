export class TableSharedService {

    afTooltips(showScales): any{
        return {
            'Allele Freq': () => showScales ? 'Allele frequency on a discrete scale: <1/10000, <1/1000, <1%, <5%, <50% and >50%' : '',
            'Virtual Allele Freq': () => 'Allele frequency within selected samples',
            'Virtual Allele Count': () => 'Allele count within selected samples',
        }
    }

    tooltip(key, tooltips) {
        return tooltips[key] ? tooltips[key]() : '';
    }

    display(label: string, variant: any, displayMap): string {
        return displayMap[label](variant) !== null ? String(displayMap[label](variant)) : '';
    }

    keys(columns) {
        return Array.from(columns.keys());
    }

    get(k: string, columns) {
        return columns.get(k);
    }

    set(k: string, v: boolean, columns) {
        columns.set(k, v);
    }

    activeColumns(columns): string[] {
        const ac: string[] = [];
        columns.forEach((v, k) => {
            if (v) {
                ac.push(k);
            }
        });
        return ac;
    }
}
