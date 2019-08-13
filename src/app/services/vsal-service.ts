import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { constants } from '../app.constants';
import { Variant } from '../model/variant';
import { VariantSummary } from '../model/variant-summary'
import { environment } from '../../environments/environment';
import { SearchQueries } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { SampleRequest } from '../model/sample-request';
import { VariantSummaryRequest } from '../model/variant-summary-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable } from "rxjs";
import { COHORT_VALUE_MAPPING_SSVS, COHORT_VALUE_MAPPING_VSAL } from '../model/cohort-value-mapping';

export const VSAL_VARIANT_LIMIT = 10000;
export const VSAL_TIMEOUT = 300000;

@Injectable()
export class VsalService {
    constructor(private http: HttpClient) {
    }

    getVariants(query: SearchQueries, samples): Observable<VariantRequest> {
        const chromosome = query.regions.map(q => q.chromosome).join();
        const start = query.regions.map(q => q.start).join();
        const end = query.regions.map(q => q.end).join();
        let urlParams = new HttpParams()
            .append('chromosome', chromosome)
            .append('positionStart', start)
            .append('positionEnd', end)
            .append('limit', VSAL_VARIANT_LIMIT.toString())
            .append('skip', '0');

        if(samples.length){
            urlParams = urlParams.append('samples', samples);
        }else{
            return of(new VariantRequest([]));
        }

        query.options.forEach(o => {
            if (o.key) {
                if(o.key === 'dataset'){
                    urlParams = urlParams.append('dataset', COHORT_VALUE_MAPPING_VSAL[o.getValue()]);
                }else {
                    urlParams = urlParams.append(o.key, o.getValue());
                }          
            }
        });

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*')
            .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);
        return this.requests(urlParams, headers).reduce((acc: VariantRequest, x: VariantRequest, i: number) => {
            acc.variants = acc.variants.concat(x.variants);
            acc.error += x.error;
            acc.total = x.total;
            return acc;
        }, new VariantRequest([])).map((v: VariantRequest) => {
            v.variants.sort((a: Variant, b: Variant) => a.s - b.s);
            return v;
        });
    }

    getVariantsSummary(query: SearchQueries): Observable<VariantSummaryRequest> {
        let urlParams = new HttpParams()
            .append('chr', query.regions[0].chromosome)
            .append('start', String(query.regions[0].start))
            .append('end', String(query.regions[0].end))
            .append('limit', VSAL_VARIANT_LIMIT.toString())
            .append('sortBy', 'start')
            .append('descend', 'false')
            .append('skip', '0')
            .append('count', 'true')
            .append('annot', 'true');

        let dataset;

        query.options.forEach(o => {
            if (o.key) {
                if(o.key === 'dataset'){
                    if(COHORT_VALUE_MAPPING_SSVS[o.getValue()]){
                        urlParams = urlParams.append('dataset', COHORT_VALUE_MAPPING_SSVS[o.getValue()]);
                        dataset = COHORT_VALUE_MAPPING_SSVS[o.getValue()];
                    }
                }else {
                    urlParams = urlParams.append(o.key, o.getValue());
                }           
            }
        });

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.requestsSummary(urlParams, headers).reduce((acc: VariantSummaryRequest, x: VariantSummaryRequest, i: number) => {
            acc.variants = acc.variants.concat(x.variants);
            acc.error += x.error;
            acc.total = x.total;
            return acc;
        }, new VariantSummaryRequest([])).map((v: VariantSummaryRequest) => {
            v.variants.sort((a: VariantSummary, b: VariantSummary) => a.start - b.start);
            return v;
        });
    }

    getSamples(query: SearchQueries): Observable<SampleRequest> {
        const chromosome = query.regions.map(q => q.chromosome).join();
        const start = query.regions.map(q => q.start).join();
        const end = query.regions.map(q => q.end).join();

        let urlParams = new HttpParams()
            .append('chromosome', chromosome)
            .append('selectSamplesByGT', 'true')
            .append('positionStart', start)
            .append('positionEnd', end);

        /*let objParams = {
            chromosome: chromosome,
            dataset: 'mgrb',
            selectSamplesByGT: 'true',
            positionStart: start,
            positionEnd: end,
            jwt: localStorage.getItem('idToken')
        }*/

        query.options.forEach(o => {
            if (o.key) {
                if(o.key === 'dataset'){
                    urlParams = urlParams.append('dataset', COHORT_VALUE_MAPPING_VSAL[o.getValue()]);
                }else {
                    urlParams = urlParams.append(o.key, o.getValue());
                }           
            }
        });

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*')
            .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);
        //this.http.post(environment.vsalUrl2, urlParams, {headers: headers})
        return this.http.get(environment.vsalUrl2, {params: urlParams, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    if(data['error']['name'] === "JWT verification failed"){
                        return new SampleRequest([], constants.PERMISSION_ERROR_MESSAGE);
                    }
                    Raven.captureMessage("VSAL ERROR: " + data['error']);
                    return new SampleRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE);
                }
                const vs = new SampleRequest(data['sampleIDs']);
                vs.total = data['total'];
                return vs;
            })
            .catch(error => {
                Raven.captureMessage("VSAL ERROR: " + JSON.stringify(error));
                return of(new SampleRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE));
            })
    }


    // getVariantsBySampleIds(query: Array<string>): Observable<VariantRequest> {
    //     let urlParams = new HttpParams()
    //         .append('sampleIds', JSON.stringify(query))
    //         .append('limit', VSAL_VARIANT_LIMIT.toString())
    //         .append('sortBy', 'start')
    //         .append('descend', 'false')
    //         .append('skip', '0')
    //         .append('count', 'true')
    //         .append('annot', 'true');

    //     const headers = new HttpHeaders()
    //         .append('Content-Type', 'application/json')
    //         .append('Accept', '*/*');
    //     return this.requests(urlParams, headers).reduce((acc: VariantRequest, x: VariantRequest, i: number) => {
    //         acc.variants = acc.variants.concat(x.variants);
    //         acc.error += x.error;
    //         return acc;
    //     }, new VariantRequest([])).map((v: VariantRequest) => {
    //         v.variants.sort((a: Variant, b: Variant) => a.start - b.start);
    //         return v;
    //     });
    // }

    private requests(params: HttpParams, headers: HttpHeaders): Observable<VariantRequest> {
        return Observable.create((observer) => {
            this.request(params, headers).subscribe((vs: VariantRequest) => {
                observer.next(vs);
                if (vs.error) {
                    observer.complete();
                } else {
                    if (vs.total > VSAL_VARIANT_LIMIT) {
                        let i: number;
                        let completed = 0;
                        const queued = Math.floor(vs.total / VSAL_VARIANT_LIMIT);
                        for (i = VSAL_VARIANT_LIMIT; i < vs.total; i += VSAL_VARIANT_LIMIT) {
                            params = params.set('skip', String(i));
                            this.request(params, headers).subscribe((svs: VariantRequest) => {
                                observer.next(svs);
                                completed++;
                                if (completed === queued || svs.error) {
                                    observer.complete();
                                }
                            });
                        }
                    } else {
                        observer.complete();
                    }
                }
            });
        });
    }

    private request(params: HttpParams, headers: HttpHeaders): Observable<VariantRequest> {
        return this.http.get(environment.vsalUrl2, {params: params, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    if(data['error']['name'] === "JWT verification failed"){
                        return new VariantRequest([], constants.PERMISSION_ERROR_MESSAGE);
                    }
                    Raven.captureMessage("VSAL ERROR: " + data['error']);
                    return new VariantRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE);
                }
                const vs = new VariantRequest(data['v']);

                if (data['total'] && data['total'] !== -1) {
                    vs.total = data['total'];
                }
                return vs;
            })
            .catch((e) => {
                Raven.captureMessage("VSAL ERROR: " + JSON.stringify(e));
                return of(new VariantRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE));
            });
    }


    private requestsSummary(params: HttpParams, headers: HttpHeaders): Observable<VariantSummaryRequest> {
        return Observable.create((observer) => {
            this.requestSummary(params, headers).subscribe((vs: VariantSummaryRequest) => {
                observer.next(vs);
                if (vs.error) {
                    observer.complete();
                } else {
                    if (vs.total > VSAL_VARIANT_LIMIT) {
                        let i: number;
                        let completed = 0;
                        const queued = Math.floor(vs.total / VSAL_VARIANT_LIMIT);
                        for (i = VSAL_VARIANT_LIMIT; i < vs.total; i += VSAL_VARIANT_LIMIT) {
                            params = params.set('skip', String(i));
                            this.requestSummary(params, headers).subscribe((svs: VariantSummaryRequest) => {
                                observer.next(svs);
                                completed++;
                                if (completed === queued || svs.error) {
                                    observer.complete();
                                }
                            });
                        }
                    } else {
                        observer.complete();
                    }
                }
            });
        });
    }

    private requestSummary(params: HttpParams, headers: HttpHeaders): Observable<VariantSummaryRequest> {
        return this.http.get(environment.vsalUrl+ '/' + params.get('dataset') + '/query', {params: params, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    Raven.captureMessage("VSAL ERROR: " + data['error']);
                    return new VariantSummaryRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE);
                }
                const vs = new VariantSummaryRequest(data['variants']);
                if (data['total'] && data['total'] !== -1) {
                    vs.total = data['total'];
                }
                return vs;
            })
            .catch((e) => {
                Raven.captureMessage("VSAL ERROR: " + JSON.stringify(e));
                return of(new VariantSummaryRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE));
            });
    }
}

