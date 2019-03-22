import { Region } from '../model/region';
import { SearchQuery } from '../model/search-query';
import { VariantSummaryRequest } from '../model/variant-summary-request';

export class VariantSearch {
    getVariants(query: SearchQuery, results, errors, searchQuery): Promise<any[]> {
        const promise = new Promise<any[]>((resolve, reject) => {
            results.take(1).subscribe(
                (vr: VariantSummaryRequest) => {
                    if (vr.error) {
                        errors.next(vr.error);
                        resolve([]);
                        return;
                    }
                    resolve(vr.variants);
                },
                (e: any) => {
                    errors.next(e);
                    resolve([]);
                }
            );
        });
       searchQuery.next(query);
        return promise;
    }

    getCurrentRegion(lastQuery): Region {
        if (!lastQuery) {
            return null;
        }
        return new Region(lastQuery.chromosome, lastQuery.start, lastQuery.end);
    }

    getSmallerRegionString(lastQuery) {
        return `${lastQuery.chromosome}:${lastQuery.start}-${lastQuery.start + 100000}`;
    }

    hasMoved(startingRegion, lastQuery) {
        if(startingRegion){
            return startingRegion.start !== lastQuery.start || startingRegion.end !== lastQuery.end;
        }
        return false;
    }
}
