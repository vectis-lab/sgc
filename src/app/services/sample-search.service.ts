import { Injectable } from '@angular/core';
import { forkJoin } from "rxjs";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { VsalService } from './vsal-service';
import { VariantSearchService } from './variant-search-service';
import { GENE_REGION_MAPPING } from '../shared/geneRegionMapping';
import { SampleRequest } from '../model/sample-request';


@Injectable()
export class SampleSearch {
    private sampleIdsSource = new Subject<string[]>();
    sampleIds = this.sampleIdsSource.asObservable();

    private sampleLoadingSource = new Subject<boolean>();
    sampleLoading = this.sampleLoadingSource.asObservable();

    private genesFilterSource = new BehaviorSubject<string[]>([]);
    genesFilter = this.genesFilterSource.asObservable();

    error = new Subject<any>();

    constructor(private vsal: VsalService
        //, private vss: VariantSearchService
    ) { }

    getSamples(genes) {
        this.sampleLoadingSource.next(true);
        this.genesFilterSource.next(genes);
        const joinedQuery = genes.map(gene => {
            const sampleQuery = GENE_REGION_MAPPING[gene];
            sampleQuery.options = [];
            return this.vsal.getSamples(sampleQuery)}
        )
        //this.vss.getVariants(GENE_REGION_MAPPING[genes[0]]);
        forkJoin(joinedQuery).subscribe((joinedSampleRequest) => {
            let joinedSampleIds = []
            joinedSampleRequest.forEach(sampleRequest => {
                joinedSampleIds = joinedSampleIds.concat(sampleRequest['samples']);               
                joinedSampleIds = joinedSampleIds.filter((elem, index) =>  joinedSampleIds.indexOf(elem) === index);              
            });
            this.sampleLoadingSource.next(false);
            this.sampleIdsSource.next(joinedSampleIds);
            this.error.next(null);
        },
        e => {
            this.error.next(e);
            this.sampleLoadingSource.next(false);
        });  
    }

    removeGene(gene) {
        let removedGenesFilter = [...this.genesFilterSource.getValue()];
        if(removedGenesFilter.length){
            this.genesFilterSource.next(removedGenesFilter);
            this.getSamples(removedGenesFilter);
        }else{
            this.genesFilterSource.next([]);
        }
            
    }

    clearGeneFilter() {
        this.genesFilterSource.next([]);
    }

}
