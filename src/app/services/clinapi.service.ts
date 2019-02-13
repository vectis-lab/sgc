import { Injectable, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { MAXIMUM_NUMBER_OF_VARIANTS } from "./cttv-service";
import { VariantTrackService } from "./genome-browser/variant-track-service";
import { FAKE_CLINICAL_DATA } from "../mocks/clindata";
import { FAKE_MITOCHONDRIA_DATA } from "../mocks/mitodata";
import { FAKE_NEUROMUSCULAR_DATA } from "../mocks/neuromusculardata";
import { VariantSearchService } from "./variant-search-service";
import * as seedrandom from "seedrandom";
import { Subscription } from "rxjs/Subscription";
import { HttpClient } from '@angular/common/http';
import { DEV } from "../shared/tempConfiguration";
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
                'AAACU','AAACV','AAACX','AAACY','AAACZ', 'AAADA', 'AAADB', 'AAADC', 'AAADD', 'AAADE', 'AAADF', 'AAADG', 'AAADH', 'AAADI', 'AAADJ', 'AAADK', 'AAADL', 'AAADM', 
                'AAADN', 'AAADO']

                const MITO_SAMPLES = ["A0121001", "A0121002", "A0121003", "A0121004", "A0121005", "A0121006", "A0121007", "A0121008", "A0121009", "A0121010", 
                "A0121011", "A0121012", "A0121013", "A0121014", "A0121015", "A0121016", "A0121017", "A0121018", "A0121019", "A0121020", "A0421001", "A0421002", 
                "A0421004", "A0621001", "A0621002", "A0621003", "A0721001", "A0721002", "A0721003", "A0721004", "A0721005", "A0821001", "A0921001", "A0921002", 
                "A0921003", "A0921004", "A0921005", "A0921006", "A1121001", "A1121002", "A1121003", "A1121004", "A1121005", "A1121006", "A1121007", "A1121008", 
                "A1121009", "A1121010", "A1121011", "A1221001", "A1221002", "A1221003", "A1221004", "A1421001", "A1421002", "A1421003", "A1421004", "A1421005", 
                "A1421006", "A1421007", "A1421008", "A1421009", "A1421010", "A1421011", "A1421012", "A1421013", "A1921001", "A1921002", "A1921003", "A1921004", 
                "A1921005", "A1921006", "A1921007", "A1921008"];

                const NEURO_SAMPLES = ["A0120001", "A0120002", "A0120003", "A0120004", "A0120005", "A0120006", "A0120007", "A0120008", "A0120009", "A0420001", 
                "A0420002", "A0420003", "A0420004", "A0420005", "A0420006", "A0420007", "A0420008", "A0420009", "A0420010", "A0620001", "A0620002", "A0620003", 
                "A0620004", "A0620005", "A0620006", "A0620007", "A0620008", "A0620009", "A0620010", "A0620011", "A0620012", "A0620013", "A0620014", "A0620015", 
                "A0620016", "A0620017", "A0620018", "A0620019", "A0620020", "A0620021", "A0620022", "A0620023", "A0620024", "A0620025", "A0620026", "A0620027", 
                "A0620028", "A0620029", "A0620030", "A0620031", "A0720001", "A0720002", "A0720003", "A0720004", "A0720005", "A0720006", "A0720007", "A0820001", 
                "A0820002", "A0820003", "A0820004", "A0820005", "A0820006", "A0820007", "A0820008", "A0920001", "A0920002", "A0920003", "A0920004", "A0920005", 
                "A0920006", "A0920007", "A0920008", "A1020001", "A1020002", "A1120001", "A1120002", "A1120003", "A1420001", "A1420002", "A1420003", "A1420004", 
                "A1420005"];

                const mockSamples = this.samples.map(sample => {
                    if(this.samples.every(val => MITO_SAMPLES.includes(val))){
                        return TEMP_SAMPLES[MITO_SAMPLES.indexOf(sample)];
                    }else if(this.samples.every(val => NEURO_SAMPLES.includes(val))){
                        return TEMP_SAMPLES[NEURO_SAMPLES.indexOf(sample)];
                    }
                    
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
            if(DEV){
                return Observable.of<any>(FAKE_MITOCHONDRIA_DATA);
            }else{
                return this.http.get<any>(`${environment.vsalUrl2}?pheno=true&dataset=mito&jwt=${localStorage.getItem('idToken')}`).map(res => {
                    return JSON.parse(res.pheno)
                });
            }
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return Observable.of<any>(FAKE_MITOCHONDRIA_DATA);
        }//if not authorize and not opt to see demo
        else {
            return Observable.throw({ status: 401 });
        }
    }

    getNeuromuscular(demo = false, authorize = false): Observable<any> {
        if(authorize){
            if(DEV){
                return Observable.of<any>(FAKE_NEUROMUSCULAR_DATA);
            }else{
                //Don't have the real data of neuromuscular deployed anywhere yet
                /*return this.http.get<any>(`http://129.94.15.156:8080/vsal/core/find?pheno=true&dataset=mito&jwt=${localStorage.getItem('idToken')}`).map(res => {
                    return JSON.parse(res.pheno)
                });*/
            }
        }//if not authorize but want to see demo
        else if(demo){
            console.log("DEMO")
            return Observable.of<any>(FAKE_NEUROMUSCULAR_DATA);
        }//if not authorize and not opt to see demo
        else {
            return Observable.throw({ status: 401 });
        }
    }

    //Bakal diganti nih!!!
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
