import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FAKE_CLINICAL_DATA } from "../mocks/clindata";
import { FAKE_MITOCHONDRIA_DATA } from "../mocks/mitodata";
import { FAKE_NEUROMUSCULAR_DATA } from "../mocks/neuromusculardata";
import { FAKE_BRAIN_MALFORMATIONS_DATA } from "../mocks/brainmalformationsdata";
import { FAKE_EPILEPTIC_ENCEPHALOPATHIES } from "../mocks/epilepticencephalopathiesdata";
import { FAKE_ICCON_DATA } from "../mocks/iccon";
import { FAKE_LEUKODYSTROPHIES_DATA } from "../mocks/leukodystrophiesdata";
import { FAKE_ACUTE_CARE_DATA, FAKE_ACUTE_CARE_DATA_COMBINED } from "../mocks/acutecaredata";
import { VariantSearchService } from './variant-search-service';
import { Subscription } from 'rxjs/Subscription';
import { of, throwError, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ClinapiService implements OnDestroy {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    subs: Subscription[] = [];
    internalSampleIDs = new Subject<string[]>();
    

    constructor(
        private vss: VariantSearchService,
        private http: HttpClient
    ) {
        this.subs.push(
            this.changes.debounceTime(100).subscribe(v => {
                this.vss.filter = this.filterVariants;
                this.samples = this.samplesGroup
                    .all()
                    .filter(s => (s.value > 0 && s.key !== ""))
                    .map(s => s.key);
                this.internalSampleIDs.next(this.samples);
                
                this.vss.getVariants(this.vss.lastQuery, this.samples.join());
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
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        //if authorize to see clinical data
        if(authorize){
            return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=mito`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });
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
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=neuromuscular`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_NEUROMUSCULAR_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getAcutecare(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            return of<any>(FAKE_ACUTE_CARE_DATA_COMBINED);
            return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=acutecare`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_ACUTE_CARE_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getBrainMalformations(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            /*return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=bm`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });*/
            return of<any>(FAKE_BRAIN_MALFORMATIONS_DATA);
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_BRAIN_MALFORMATIONS_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getLeukodystrophies(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            /*return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=leukodystrophies`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });*/
            return of<any>(FAKE_LEUKODYSTROPHIES_DATA);
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_LEUKODYSTROPHIES_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getEpilepticEncephalopathies(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            /*return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=ee`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });*/
            return of<any>(FAKE_EPILEPTIC_ENCEPHALOPATHIES);
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_EPILEPTIC_ENCEPHALOPATHIES);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getIccon(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            /*return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=iccon`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });*/
            return of<any>(FAKE_ICCON_DATA);
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_ICCON_DATA);
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
