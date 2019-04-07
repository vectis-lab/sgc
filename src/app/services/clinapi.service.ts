import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MAXIMUM_NUMBER_OF_VARIANTS } from './cttv-service';
import { FAKE_CLINICAL_DATA } from "../mocks/clindata";
import { FAKE_MITOCHONDRIA_DATA } from "../mocks/mitodata";
import { FAKE_NEUROMUSCULAR_DATA } from "../mocks/neuromusculardata";
import { VariantSearchService } from './variant-search-service';
import * as seedrandom from 'seedrandom';
import { Subscription } from 'rxjs/Subscription';
import { of, throwError, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { DEV } from "../shared/tempConfiguration";
import { SearchOption } from '../model/search-option';
import { environment } from '../../environments/environment';
import { TEMP_SAMPLES, MITO_SAMPLES, NEURO_SAMPLES } from '../mocks/sample.mock'

@Injectable()
export class ClinapiService implements OnDestroy {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    subs: Subscription[] = [];

    constructor(
        private vss: VariantSearchService,
        private http: HttpClient
    ) {
        this.subs.push(
            this.changes.debounceTime(300).subscribe(v => {
                this.vss.filter = this.filterVariants;
                this.samples = this.samplesGroup
                    .all()
                    .filter(s => s.value > 0)
                    .map(s => s.key);

                const mockSamples = this.samples.map(sample => {
                    if(this.samples.every(val => MITO_SAMPLES.includes(val))){
                        return TEMP_SAMPLES[MITO_SAMPLES.indexOf(sample)];
                    }else if(this.samples.every(val => NEURO_SAMPLES.includes(val))){
                        return TEMP_SAMPLES[NEURO_SAMPLES.indexOf(sample)];
                    }
                    
                })

                if(this.samples.length){
                    this.vss.lastQuery[0].options = [(new SearchOption('', 'samples', [], mockSamples.join()))];
                }else{
                    this.vss.lastQuery[0].options=[]
                }
                
                this.vss.getVariants(this.vss.lastQuery);
            })
        );
    }

    getPatients(demo = false): Observable<any> {
        if (demo) {
            return of<any>(FAKE_CLINICAL_DATA);
        } else {
            return throwError({status: 401})
        }
    }

    getMitochondria(demo = false, authorize = false): Observable<any> {
        //if authorize to see clinical data
        if(authorize){
            if(DEV){
                return of<any>(FAKE_MITOCHONDRIA_DATA);
            }else{
                return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=mito&jwt=${localStorage.getItem('idToken')}`).map(res => {
                    return JSON.parse(res.pheno)
                });
            }
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_MITOCHONDRIA_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getNeuromuscular(demo = false, authorize = false): Observable<any> {
        if(authorize){
            if(DEV){
                return of<any>(FAKE_NEUROMUSCULAR_DATA);
            }else{
                return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=neuromuscular&jwt=${localStorage.getItem('idToken')}`).map(res => {
                    return JSON.parse(res.pheno)
                });
            }
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_NEUROMUSCULAR_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    filterVariants = (v: any[]) => {
        if (this.samples.length === 0) {
            return [];
        }
        return v
    };

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
        this.vss.filter = null;
    }
}
