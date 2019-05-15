import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, OnDestroy, OnInit, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Chart } from "../../../model/clinical-cohort-chart";

@Component({
    selector: 'app-acutecare-information',
    templateUrl: './acutecare-information.component.html',
    styleUrls: ['./acutecare-information.component.css'],
    providers: [ClinapiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AcutecareInformationComponent implements AfterViewInit, OnDestroy, OnInit {
    //Internal IDs
    @Input() samples: string[] = [];
    externalIDs: string [] = [];
    selectedExternalIDs: string[] = [];
    selectedInternalIDs: string[] = [];
    sampleDim: any;
    error: any;
    denied = false;
    patients = [];
    ndx: any;
    charts: Chart[];
    params: any;
    subscriptions: Subscription[] = [];
    demo: boolean = false;
    showSampleCSV: boolean = false;

    constructor(private cs: ClinapiService,
                private cd: ChangeDetectorRef,
                private ClinicalFilterService: ClinicalFilteringService,
                private auth: Auth,
                private router: Router,
                private route: ActivatedRoute) {
        this.subscriptions.push(route.params.subscribe(p => {
            this.params = p;
            this.demo = p['demo'] === 'true';
        }));
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.subscriptions.push(this.auth.userPermissions.subscribe(permissions => {
            if(permissions.includes('acutecare/pheno')){
                this.getAcutecare(this.demo, true);
            }else {
                this.getAcutecare(this.demo, false)
            }
        }));

        this.subscriptions.push(this.cs.internalSampleIDs.subscribe(samples => {
            this.selectedInternalIDs = samples;
            this.selectedExternalIDs = this.patients
                .filter(patient => this.selectedInternalIDs.includes(patient.internalIDs))
                .map(patient => patient.externalIDs);
        }));
    }

    getAcutecare(demo, authorize){
        this.cs.getAcutecare(demo, authorize).subscribe(v => {
            this.patients = v.filter(sample => this.samples.includes(sample.internalIDs));
            this.externalIDs = this.patients.map(sample => sample.externalIDs);
            this.selectedExternalIDs = this.externalIDs;
            this.ndx = crossfilter(this.patients);
            this.loadCharts();
        },
        e => {
            if (e.status && e.status === 401) {
                this.denied = true;
            } else {
                this.error = e;
            }
            this.cd.detectChanges();
        });
    }

    onSelectSamples(externalSamples){
        this.selectedExternalIDs = externalSamples;
        this.sampleDim.filter(sample => externalSamples.includes(sample));
        dc.renderAll();
        this.cs.changes.next();
        this.cd.detectChanges();
    }

    onUpdateSamples(externalSamples){
        let validExternalSamples = externalSamples.filter(sample => this.patients.map(p => p.externalIDs).includes(sample));
        let filteredPatients = this.patients.filter(patient => validExternalSamples.includes(patient.externalIDs));
        this.ndx = crossfilter(filteredPatients);
        this.externalIDs = validExternalSamples;
        this.selectedExternalIDs = validExternalSamples;
        this.ClinicalFilterService.clearFilters();

        this.loadCharts();
        this.cs.changes.next();
    }

    loadCharts(){
        this.cs.samplesGroup = this.ndx.dimension((d) => {
            return d['internalIDs'];
        }).group();

        const all = this.ndx.groupAll();

        this.sampleDim = this.ndx.dimension(function(d){ return d.externalIDs;})
        
        var sexDim = this.ndx.dimension(function(d){ return d['Sex of patient:'];})
        var sexGroup = sexDim.group();

        var maternalEthnicityDim = this.ndx.dimension(function(d){ return d['Maternal Ethnicity (choose one of):'];})
        var maternalEthnicityGroup = maternalEthnicityDim.group();

        var paternalEthnicityDim = this.ndx.dimension(function(d){ return d['Paternal Ethnicity (choose one of):'];})
        var paternalEthnicityGroup = paternalEthnicityDim.group();

        this.charts = [
            new Chart(
                'sex',
                'pie',
                sexDim,
                340,
                200,
                true,
                sexGroup,
            ),
            new Chart(
                'maternalEthnicity',
                'row',
                maternalEthnicityDim,
                340,
                200,
                true,
                maternalEthnicityGroup,
            ),
            new Chart(
                'paternalEthnicity',
                'row',
                paternalEthnicityDim,
                340,
                200,
                true,
                paternalEthnicityGroup,
            ),
        ];


        dc.dataCount('.dc-data-count')
        .dimension(this.ndx)
        .group(all);

        dc.renderAll();

        this.cd.detectChanges();
    }

    onHidden(chartName: string){
        this.charts.forEach(chart => {
            if(chart.name === chartName){
                chart.enabled = false;
            }
        })
    }

    viewDemo() {
        const o = {timestamp: Date.now(), demo: true, query: this.params['query']};
        this.router.navigate(['/search/results', o]);
    }

    resetFilters() {    
        dc.filterAll();
        dc.renderAll();
        this.ClinicalFilterService.clearFilters();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
    }

}
