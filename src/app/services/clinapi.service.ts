import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FAKE_CLINICAL_DATA } from "../mocks/clindata";
import { FAKE_DEMO_DATA } from "../mocks/demodata";
import { VariantSearchService } from './variant-search-service';
import { Subscription } from 'rxjs/Subscription';
import { of, throwError, Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/delay';

@Injectable()
export class ClinapiService implements OnDestroy {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    subs: Subscription[] = [];
    internalSampleIDs = new Subject<string[]>();
    
    private selectedExternalSamplesClinSource = new BehaviorSubject<string[]>([]);
    selectedExternalSamplesClin = this.selectedExternalSamplesClinSource.asObservable();

    private selectedExternalSamplesFamSource = new BehaviorSubject<string[]>([]);
    selectedExternalSamplesFam = this.selectedExternalSamplesFamSource.asObservable();

    constructor(
        private vss: VariantSearchService,
        private http: HttpClient
    ) {
        this.subs.push(
            this.changes.debounceTime(100).subscribe(family => {
                this.vss.filter = this.filterVariants;
                this.samples = this.samplesGroup
                    .all()
                    .filter(s => (s.value > 0 && s.key !== ""))
                    .map(s => s.key);
                if(family){
                    this.samples = this.samples.concat(family)
                }
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

    getDemo(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            return of<any>(FAKE_DEMO_DATA);
            /*return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=demo`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });*/
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_DEMO_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getMgrb(demo = false, authorize = false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        if(authorize){
            return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=mgrb`, httpOptions).map(res => {
                return JSON.parse(res.pheno)
            });
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return of<any>(FAKE_DEMO_DATA);
        }//if not authorize and not opt to see demo
        else {
            return throwError({ status: 401 });
        }
    }

    getAGHAPanel(cohort){
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('idToken')}`})
        };
        return this.http.get<any>(`${environment.vsalUrl2}?genelist=true&dataset=${cohort}`, httpOptions).map(res => {
            return JSON.parse(res.genelist)
        });
    }

    filterVariants = (v: any[]) => {
        if (this.samples.length === 0) {
            return [];
        }
        return v
    };

    setSelectedExternalSamplesClin(value){
        this.selectedExternalSamplesClinSource.next(value);
    }

    setSelectedExternalSamplesFam(value){
        this.selectedExternalSamplesFamSource.next(value);
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
        this.vss.filter = null;
    }
}
