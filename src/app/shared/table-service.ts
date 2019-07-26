export class TableSharedService {

    afTooltips(showScales): any{
        return {
            'Allele Freq': () => showScales ? 'Allele frequency on a discrete scale: <1/10000, <1/1000, <1%, <5%, <50% and >50%' : '',
            'Virtual Allele Freq': () => 'Allele frequency from selected samples',
            'Virtual Allele Count': () => 'Allele count from selected samples',
        }
    }

    tooltip(key, tooltips) {
        return tooltips[key] ? tooltips[key]() : '';
    }

    display(label: string, variant: any, displayMap): string {
        return displayMap[label](variant) !== null ? String(displayMap[label](variant)) : '';
    }

    sort(label: string, variants: any[], lastSortedLabel, sortMap, lastSortedOrder) {
        if (lastSortedLabel === label) {
            lastSortedOrder = !lastSortedOrder;
        } else {
            lastSortedLabel = label;
            lastSortedOrder = true;
        }
        const fn = sortMap[label];
        if (lastSortedOrder) {
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
