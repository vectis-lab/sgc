import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { MAXIMUM_NUMBER_OF_VARIANTS } from "./cttv-service";
import { VariantTrackService } from "./genome-browser/variant-track-service";
import { FAKE_CLINICAL_DATA } from "../mocks/clindata";
import { FAKE_MITOCHONDRIA_DATA } from "../mocks/mitodata";
import { VariantSearchService } from "./variant-search-service";
import * as seedrandom from "seedrandom";
import { Subscription } from "rxjs/Subscription";
import { HttpClient } from '@angular/common/http';
import { SearchOption } from '../model/search-option';


@Injectable()
export class ClinapiService implements OnDestroy {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    subs: Subscription[] = [];

    constructor(
        private vss: VariantSearchService,
        private vts: VariantTrackService,
        private http: HttpClient
    ) {
        this.subs.push(
            this.changes.debounceTime(300).subscribe(v => {
                this.vss.filter = this.filterVariants;
                //SAMPLE DI BAWAH INI YANG BAKAL DI KIRIM KE BACKEND BUAT AMBIL VARIANT YANG BARU
                this.samples = this.samplesGroup
                    .all()
                    .filter(s => s.value > 0)
                    .map(s => s.key);
                const loc = {
                    from: this.vss.lastQuery.start,
                    to: this.vss.lastQuery.end
                };

                if (this.vss.variants.length > MAXIMUM_NUMBER_OF_VARIANTS) {
                    this.vss.getVariants(this.vss.lastQuery);
                } else {
                    vts.track.data().call(vts.track, {
                        loc: loc,
                        on_success: () => {
                            vts.track.display().update.call(vts.track, loc);
                        }
                    });
                }
            })
        );
    }

    getPatients(demo = false): Observable<any> {
        if (demo) {
            return Observable.of<any>(FAKE_CLINICAL_DATA);
        } else {
            return Observable.throw({ status: 401 });
        }
    }

    getMitochondria(demo = false, authorize = false): Observable<any> {
        //if authorize to see clinical data
        if(authorize){
            //For staging/demo use mock data
            return this.http.get<any>(`http://129.94.15.156:8080/vsal/core/find?pheno=true&dataset=mito&jwt=${localStorage.getItem('idToken')}`).map(res => {
                return JSON.parse(res.pheno)
            });
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return Observable.of<any>(FAKE_MITOCHONDRIA_DATA);
        }//if not authorize and not opt to see demo
        else {
            return Observable.throw({ status: 401 });
        }
    }

    //Bakal diganti nih!!!
    filterVariants = (v: any[]) => {
        if (this.samples.length >= 74) {
            return v;
        } else if (this.samples.length === 0) {
            return [];
        }
        const rng = seedrandom(this.samples.join(""));
        const p = this.samples.length / 74.0 + 0.025;
        const vf = [];
        for (let i = 0; i < v.length; i++) {
            if (rng() < p) {
                vf.push(v[i]);
            }
        }
        return [];
    };

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
        this.vss.filter = null;
    }
}
