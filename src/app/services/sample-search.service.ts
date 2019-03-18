import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { SampleRequest } from '../model/sample-request';
import { VsalService } from './vsal-service';
import { GENE_REGION_MAPPING } from '../shared/geneRegionMapping';


@Injectable()
export class SampleSearch {
    private sampleIdsSource = new Subject<string[]>();
    sampleIds = this.sampleIdsSource.asObservable();

    private sampleLoadingSource = new Subject<boolean>();
    sampleLoading = this.sampleLoadingSource.asObservable();

    private genesSource = new Subject<string[]>();
    genes = this.genesSource.asObservable();

    constructor(private vsal: VsalService) { }

    getSamples(gene) {
        this.sampleLoadingSource.next(true);
        let searchGene = GENE_REGION_MAPPING[gene];
        searchGene.options = [];
        this.vsal.getSamples(searchGene).subscribe(ids => {
            this.sampleLoadingSource.next(false);
            this.sampleIdsSource.next(ids.samples);
            this.genesSource.next([gene]);
        })
    }

    //Cause for now only support 1 gene, so remove gene just basically remove everything
    removeGene() {
        this.sampleLoadingSource.next(true);
        this.sampleIdsSource.next(null);
        this.sampleLoadingSource.next(false);
        this.genesSource.next([])
    }

    clearGeneFilter() {
        this.genesSource.next([]);
    }

}
