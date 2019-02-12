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
import { VsalService } from "./vsal-service";
import { environment } from '../../environments/environment';


@Injectable()
export class ClinapiService implements OnDestroy {
    samples = [];
    samplesGroup: any;
    changes = new Subject();
    subs: Subscription[] = [];

    constructor(
        private vss: VariantSearchService,
        private vts: VariantTrackService,
        private vsal: VsalService,
        private http: HttpClient
    ) {
        this.subs.push(
            this.changes.debounceTime(300).subscribe(v => {
                this.vss.filter = this.filterVariants;
                this.samples = this.samplesGroup
                    .all()
                    .filter(s => s.value > 0)
                    .map(s => s.key);
                const loc = {
                    from: this.vss.lastQuery.start,
                    to: this.vss.lastQuery.end
                };

                const TEMP_SAMPLES = ['AAAAA','AAAAB','AAAAC','AAAAD','AAAAE','AAAAF','AAAAG','AAAAH','AAAAI','AAAAJ','AAAAK','AAAAL','AAAAM','AAAAN','AAAAO',
                'AAAAQ','AAAAR','AAAAS','AAAAT','AAAAU','AAAAV','AAAAW','AAAAX','AAAAY','AAAAZ','AAABA','AAABB','AAABC','AAABD','AAABE','AAABF','AAABG',
                'AAABH','AAABI','AAABJ','AAABK','AAABL','AAABM','AAABN','AAABO','AAABP','AAABQ','AAABR','AAABS','AAABT','AAABU','AAABV','AAABW','AAABX','AAABY','AAABZ',
                'AAACA','AAACB','AAACC','AAACD','AAACF','AAACG','AAACH','AAACJ','AAACK','AAACL','AAACM','AAACN','AAACO','AAACP','AAACQ','AAACR','AAACS','AAACT',
                'AAACU','AAACV','AAACX','AAACY','AAACZ']

                const MITO_SAMPLES = ["A0121001", "A0121002", "A0121003", "A0121004", "A0121005", "A0121006", "A0121007", "A0121008", "A0121009", "A0121010", "A0121011", "A0121012", "A0121013", "A0121014", "A0121015", "A0121016", "A0121017", "A0121018", "A0121019", "A0121020", "A0421001", "A0421002", "A0421004", "A0621001", "A0621002", "A0621003", "A0721001", "A0721002", "A0721003", "A0721004", "A0721005", "A0821001", "A0921001", "A0921002", "A0921003", "A0921004", "A0921005", "A0921006", "A1121001", "A1121002", "A1121003", "A1121004", "A1121005", "A1121006", "A1121007", "A1121008", "A1121009", "A1121010", "A1121011", "A1221001", "A1221002", "A1221003", "A1221004", "A1421001", "A1421002", "A1421003", "A1421004", "A1421005", "A1421006", "A1421007", "A1421008", "A1421009", "A1421010", "A1421011", "A1421012", "A1421013", "A1921001", "A1921002", "A1921003", "A1921004", "A1921005", "A1921006", "A1921007", "A1921008"];

                const mockSamples = this.samples.map(sample => {
                    return TEMP_SAMPLES[MITO_SAMPLES.indexOf(sample)];
                })
                if(this.samples.length){
                    this.vss.lastQuery.options = [(new SearchOption('', 'samples', [], mockSamples.join()))];
                }else{
                    this.vss.lastQuery.options=[]
                }
                
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
            return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=mito&jwt=${localStorage.getItem('idToken')}`).map(res => {
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
