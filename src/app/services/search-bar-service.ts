import { Injectable } from '@angular/core';
import { RegionService } from './autocomplete/region-service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SearchOption } from '../model/search-option';
import { Region } from '../model/region';
import { Router, Params } from '@angular/router';
import { AutocompleteService } from './autocomplete/autocomplete-service';
import { GenericAutocompleteResult, VariantAutocompleteResult } from '../model/autocomplete-result';
import { ElasticGeneSearch } from './autocomplete/elastic-gene-search-service';
import { PositionService } from './autocomplete/position-service';
import { GenomicsEnglandService } from './genomics-england.service';
import { of, Observable, combineLatest } from "rxjs";
import { RegionAutocomplete } from '../model/region-autocomplete';
import { GeneAutocomplete } from '../model/gene-autocomplete';
import { genePanelsFull } from '../shared/genePanelList';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';

export const QUERY_LIST_ERROR = "You query is incorrect. Please check your query and try again"

@Injectable()
export class SearchBarService {
    query = '';
    panel='';
    panelGroup = '';
    autocompleteServices: AutocompleteService<any>[] = [];
    options: SearchOption[];
    autocompleteError = '';
    searchedEvent = new Subject();

    private startGreaterThanEndSource = new BehaviorSubject<boolean>(false);
    startGreaterThanEnd = this.startGreaterThanEndSource.asObservable();

    private geneListSource = new BehaviorSubject<string>('');
    geneList = this.geneListSource.asObservable();

    private selectedCohortSource = new BehaviorSubject<string>('Demo');
    selectedCohort = this.selectedCohortSource.asObservable();

    constructor(private geneService: ElasticGeneSearch,
                private regionService: RegionService,
                private positionService: PositionService,
                private genomicsEnglandService: GenomicsEnglandService,
                private router: Router) {
        this.autocompleteServices = [
            regionService,
            positionService,
            geneService
        ];

        this.autocompleteError = '';
        this.query = '';
        this.options = [
            new SearchOption('Cohort', 'dataset', ['Demo', 'Mitochondria', 'Neuromuscular', 'Acutecare', 'Epileptic Encephalopathies', 'Brain Malformations', 'Leukodystrophies', 'ICCon', 'Childranz', 'HIDDEN', 'Genetic Immunology'], 'Demo'),
        ];
    }

    searchWithParams(params: Params): Promise<VariantAutocompleteResult<any>> {
        const query = params['query'];
        const cohort = params['cohort'];
        if (!query) {
            return <any>Promise.resolve();
        }
        this.parseOptions(params);

        if (!this.query) {
            this.query = query;
        }

        this.searchedEvent.next();

        const handleAutocompleteError = (e: string): Promise<any> => {
            this.autocompleteError = e;
            return Promise.reject(e);
        };

        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            if (v.length <= 0) {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }
            if(this.checkErrorRegion(query)){
                return handleAutocompleteError('Start position cannot be greater than end');
            }
            let bestMatch = v[0];
            if(bestMatch instanceof GeneAutocomplete){
                //Workaround to handle Elasticsearch not returning the correct match(Example TNNI3 will return TNNI3K instead)
                if(bestMatch.result.symbol.toUpperCase() !== query.toUpperCase()){
                    v.forEach(e => {
                        if(e.result.symbol.toUpperCase() === query.toUpperCase()){
                            bestMatch = e;
                        }
                    })
                }
            }
            if (bestMatch.match(query)) {
                return bestMatch;
            } else {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }

        });

    }

    verifyQuery(query: string): Promise<boolean>{
        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            const bestMatch = v[0];
            if(v[0]){
                if (this.checkErrorRegion(query)) {
                    return false;
                }else if(bestMatch instanceof GeneAutocomplete){
                    //Workaround to handle Elasticsearch not returning the correct match(Example TNNI3 will return TNNI3K instead)
                    if(bestMatch.result.symbol.toUpperCase() === query.toUpperCase()){
                        return true;
                    }else{
                        let flag = false; 
                        v.forEach(e => {
                            if(e.result.symbol.toUpperCase() === query.toUpperCase()){
                                flag = true
                            }
                        })
                        return flag;
                    } 
                }else if(bestMatch instanceof RegionAutocomplete && bestMatch.match(query)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
        });

    }

    searchWithMultipleParams(params: Params): Promise<VariantAutocompleteResult<any>[]> {
        const query = params['query'];
        const panel = params['panel'];
        const panelGroup = params['panelGroup']
        const cohort = params['cohort'];

        if (!query && !panel) {
            return <any>Promise.resolve();
        }
        this.parseOptions(params);

        if (!this.query) {
            this.query = query;
        }

        if (!this.panel) {
            this.panel = panel;
        }

        this.searchedEvent.next();
        let arrayOfQueries = [];

        if(query.length){
            arrayOfQueries = query.split(',');
        }

        if(query.length){
            arrayOfQueries = query.split(',');
        }
        let regions;
        let regionAutocomplete = [];
        if(panel.length && panelGroup === 'agha'){
            regions = genePanelsFull[panel];
            regionAutocomplete = regions.map(region =>{
                const chromosome = region.c;
                const start = region.s;
                const end = region.e;
                const symbol = region.sym;
                const r = new Region(chromosome, start, end, [symbol]);
                const regions = new RegionAutocomplete(r, r.name(), '', null);
                return regions;
            })
            let queries = arrayOfQueries.map(q => this.searchAutocompleteServices(q).take(1).toPromise())

            if(queries.length > 0){
                return <any>Promise.all(queries).then(v => {
                    let bestMatches = v.map(q => q[0]);
                    //Workaround to handle Elasticsearch not returning the correct match(Example TNNI3 will return TNNI3K instead)
                    v.forEach((matches,i) => {
                        let bestMatch = matches[0];
                        if(bestMatch instanceof GeneAutocomplete){
                            if(bestMatch.result.symbol.toUpperCase() !== arrayOfQueries[i].toUpperCase()){
                                matches.forEach(e => {
                                    if(e.result.symbol.toUpperCase() === arrayOfQueries[i].toUpperCase()){
                                        bestMatches[i] = e;
                                    }
                                })
                            }
                        }
                    })
                    bestMatches = bestMatches.concat(regionAutocomplete);
                    return bestMatches;
                });
            }else{
                //Workaround: doesn't work without giving delay to promise
                return new Promise((resolve) => {
                    setTimeout(function() {
                        return resolve(regionAutocomplete);
                      }, 1);
                })
            }
        }else if(panel.length && panelGroup ==='genomicEngland'){
            return this.genomicsEnglandService.getPanel(panel).toPromise().then((data) => {
                regions = data.genesData.genes.filter(e => e.gene_data.ensembl_genes.GRch37).map(e =>  e.gene_data.ensembl_genes.GRch37['82'].location);
                const genes = data.genesData.genes.map(e => e.gene_data.gene_symbol);

                const regionAutocomplete = regions.map((regionString, i) =>{
                    const results = new RegExp(/^([\dxy]+|mt+)[:\-\.,\\/](\d+)[:\-\.,\\/](\d+)$/, "i").exec(regionString);
                    const chromosome = results[1];
                    const start = Number(results[2]);
                    const end = Number(results[3]);
                    const gene = genes[i];
                    const r = new Region(chromosome, start, end, [gene]);

                    const regions = new RegionAutocomplete(r, r.name(), '', null);
                    return regions;
                })

                const queries = arrayOfQueries.map(q => this.searchAutocompleteServices(q).take(1).toPromise())

                return <any>Promise.all(queries).then(v => {
                    let bestMatches = v.map(q => q[0]);
                    bestMatches = bestMatches.concat(regionAutocomplete);
                    return bestMatches;
                });
            })
        }else{
            const queries = arrayOfQueries.map(q => this.searchAutocompleteServices(q).take(1).toPromise())

            return <any>Promise.all(queries).then(v => {
                let bestMatches = v.map(q => q[0]);
                v.forEach((matches,i) => {
                    //Workaround to handle Elasticsearch not returning the correct match(Example TNNI3 will return TNNI3K instead)
                    let bestMatch = matches[0];
                    if(bestMatch instanceof GeneAutocomplete){
                        if(bestMatch.result.symbol.toUpperCase() !== arrayOfQueries[i].toUpperCase()){
                            matches.forEach(e => {
                                if(e.result.symbol.toUpperCase() === arrayOfQueries[i].toUpperCase()){
                                    bestMatches[i] = e;
                                }
                            })
                        }
                    }
                })
                bestMatches = bestMatches.concat(regionAutocomplete);
                return bestMatches;
            });
        }
    }

    setGeneList(value){
        this.geneListSource.next(value);
    }

    setCohort(value){
        this.selectedCohortSource.next(value);
    }

    checkErrorRegion(query){
        const results = new RegExp(/^([\dxy]+|mt+)[:\-\.,\\/](\d+)[:\-\.,\\/](\d+)$/, "i").exec(query);
        const checkChromosome = new RegExp(/^([\dxy]+|mt+)$/, "i")
        if(results !== null) {
            const chromosome = results[1];
            const start = Number(results[2]);
            const end = Number(results[3]);
            if(checkChromosome.test(chromosome) && !isNaN(start) && !isNaN(end)){
                if(start > end){
                    return true;
                }
            }
        }else{
            return false;
        }
    }

    parseOptions(params: Params) {
        this.options.forEach(o => {
            if (params[o.key]) {
                o.setValue(params[o.key]);
            }
        });
    }

    search(query: string): void {
        this.query = query;
        this.navigateToSearch(query);
    }

    searchAutocompleteServices(term: string): Observable<VariantAutocompleteResult<any>[]> {
        return combineLatest(...this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).catch(e => of<GenericAutocompleteResult<any>[]>([]));
        }), this.combineStreams);
    }

    searchAutocompleteServicesStartsWith(term: string, startsWith: any[] = []): Observable<GenericAutocompleteResult<any>[]> {
        if(this.checkErrorRegion(term)){
            this.startGreaterThanEndSource.next(true);
        }else{
            this.startGreaterThanEndSource.next(false);
        }

        return combineLatest(this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).startWith(startsWith).catch(e => of([]));
        }), this.combineStreams);
    }

    displayDescription(desc: string) {
        if (!desc) {
            return '';
        } else {
            const results = desc.match(/(.*)\s\[Source:.*;Acc:.*\]$/);
            if (results) {
                return results[1];
            } else {
                return desc;
            }
        }
    }

    private navigateToSearch(query: string) {
        const obj = {query: query, timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }

    private combineStreams(...streams) {
        return [].concat.apply([], streams);
    }
}

