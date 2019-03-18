import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { constants } from '../app.constants';
import { Variant } from '../model/variant';
import { VariantSummary } from '../model/variant-summary'
import { environment } from '../../environments/environment';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { SampleRequest } from '../model/sample-request';
import { VariantSummaryRequest } from '../model/variant-summary-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable } from "rxjs";

export const VSAL_VARIANT_LIMIT = 10000;
export const VSAL_TIMEOUT = 60000;

@Injectable()
export class VsalService {
    constructor(private http: HttpClient) {
    }

    getVariants(query: SearchQuery): Observable<VariantRequest> {
        let urlParams = new HttpParams()
            .append('chromosome', query.chromosome)
            .append('dataset', 'mgrb')
            .append('positionStart', String(query.start))
            .append('positionEnd', String(query.end))
            .append('limit', VSAL_VARIANT_LIMIT.toString())
            .append('skip', '0')
            .append('returnAnnotations', 'true')
            .append('jwt', localStorage.getItem('idToken'));

        query.options.forEach(o => {
            if (o.key) {
                urlParams = urlParams.append(o.key, o.getValue());
            }
        });

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
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

    getVariantsSummary(query: SearchQuery): Observable<VariantSummaryRequest> {
        let urlParams = new HttpParams()
            .append('chr', query.chromosome)
            .append('start', String(query.start))
            .append('end', String(query.end))
            .append('limit', VSAL_VARIANT_LIMIT.toString())
            .append('sortBy', 'start')
            .append('descend', 'false')
            .append('skip', '0')
            .append('count', 'true')
            .append('annot', 'true');

        query.options.forEach(o => {
            if (o.key) {
                urlParams = urlParams.append(o.key, o.getValue());
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

    getSamples(query: SearchQuery): Observable<SampleRequest> {
        let urlParams = new HttpParams()
            .append('chromosome', query.chromosome)
            .append('dataset', 'mgrb')
            .append('selectSamplesByGT', 'true')
            .append('positionStart', String(query.start))
            .append('positionEnd', String(query.end))
            .append('returnAnnotations', 'true')
            .append('jwt', localStorage.getItem('idToken'));

        query.options.forEach(o => {
            if (o.key) {
                urlParams = urlParams.append(o.key, o.getValue());
            }
        });
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.http.get(environment.vsalUrl2, {params: urlParams, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    Raven.captureMessage("VSAL ERROR: " + data['error']);
                    return new SampleRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE);
                }
                const vs = new SampleRequest(data['sampleIDs']);
                vs.total = data['total'];
                return vs;
            },
            error => {
                Raven.captureMessage("VSAL ERROR: " + JSON.stringify(e));
                return of(new SampleRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE));
            })
    }

    private requestsSamples(params: HttpParams, headers: HttpHeaders): Observable<SampleRequest> {
        return Observable.create((observer) => {
            this.requestSamples(params, headers).subscribe((vs: SampleRequest) => {
                observer.next(vs);
                if (vs.error) {
                    observer.complete();
                }
            });
        });
    }

    private requestSamples(params: HttpParams, headers: HttpHeaders): Observable<SampleRequest> {
        return this.http.get(environment.vsalUrl, {params: params, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    Raven.captureMessage("VSAL ERROR: " + data['error']);
                    return new SampleRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE);
                }
                const vs = new SampleRequest(data['sampleIDs']);
                vs.total = data['total'];
                return vs;
            })
            .catch((e) => {
                Raven.captureMessage("VSAL ERROR: " + JSON.stringify(e));
                return of(new SampleRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE));
            });
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
        return this.http.get(environment.vsalUrl, {params: params, headers: headers})
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

