import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, OnDestroy, OnInit, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';
import * as _ from 'lodash/array';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Chart } from "../../../model/clinical-cohort-chart";

@Component({
    selector: 'app-neuromuscular-information',
    templateUrl: './neuromuscular-information.component.html',
    styleUrls: ['./neuromuscular-information.component.css'],
    providers: [ClinapiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class NeuromuscularInformationComponent implements AfterViewInit, OnDestroy, OnInit {
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
            if(permissions.includes('neuromuscular/pheno')){
                this.getNeuromuscular(this.demo, true);
            }else {
                this.getNeuromuscular(this.demo, false)
            }
        }));

        this.subscriptions.push(this.cs.internalSampleIDs.subscribe(samples => {
            this.selectedInternalIDs = samples;
            this.selectedExternalIDs = this.patients
                .filter(patient => this.selectedInternalIDs.includes(patient.internalIDs))
                .map(patient => patient.externalIDs);
        }));
    }

    getNeuromuscular(demo, authorize){
        this.cs.getNeuromuscular(demo, authorize).subscribe(v => {
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
        
        var ageOfOnsetDim = this.ndx.dimension(function(d){ return d['Age of onset'];})
        var ageOfOnsetGroup = ageOfOnsetDim.group();
        
        var evolutionOfSymptomsDim = this.ndx.dimension(function(d){ return d['Evolution of symptoms'];});
        var evolutionOfSymptomsGroup = evolutionOfSymptomsDim.group();

        var muscleWeaknessDim = this.ndx.dimension(function(d){ return d['Muscle weakness'];})
        var muscleWeaknessGroup = muscleWeaknessDim.group();
        
        var facialDim = this.ndx.dimension(function(d){ return d['Facial'];});
        var facialGroup = facialDim.group();

        var ptosisDim = this.ndx.dimension(function(d){ return d['Ptosis'];})
        var ptosisGroup = ptosisDim.group();
        
        var proximalUlDim = this.ndx.dimension(function(d){ return d['Proximal UL'];});
        var proximalUlGroup = proximalUlDim.group();

        var proxLlWeaknessDim = this.ndx.dimension(function(d){ return d['Prox. LL weakness'];})
        var proxLlWeaknessGroup = proxLlWeaknessDim.group();
        
        var distalLlWeaknessDim = this.ndx.dimension(function(d){ return d['Distal LL weakness'];});
        var distalLlWeaknessGroup = distalLlWeaknessDim.group();

        var leftBicepDim = this.ndx.dimension(function(d){ return d['Left bicep'];})
        var leftBicepGroup = leftBicepDim.group();
        
        var rightBicepDim = this.ndx.dimension(function(d){ return d['Right bicep'];});
        var rightBicepGroup = rightBicepDim.group();

        var serumCkDim = this.ndx.dimension(function(d){ return d['Serum CK'];});
        var serumCkGroup = serumCkDim.group();

        this.charts = [
            new Chart(
                'ageOfOnset',
                'row',
                ageOfOnsetDim,
                340,
                200,
                true,
                ageOfOnsetGroup,
            ),
            new Chart(
                'evolutionOfSymptoms',
                'row',
                evolutionOfSymptomsDim,
                340,
                200,
                true,
                evolutionOfSymptomsGroup
            ),
            new Chart(
                'muscleWeakness',
                'row',
                muscleWeaknessDim,
                340,
                200,
                false,
                muscleWeaknessGroup
            ),
            new Chart(
                'facial',
                'pie',
                facialDim,
                340,
                200,
                false,
                facialGroup
            ),
            new Chart(
                'ptosis',
                'pie',
                ptosisDim,
                340,
                200,
                false,
                ptosisGroup
            ),
            new Chart(
                'proximalUl',
                'pie',
                proximalUlDim,
                340,
                200,
                false,
                proximalUlGroup
            ),
            new Chart(
                'proxLlWeakness',
                'row',
                proxLlWeaknessDim,
                340,
                200,
                false,
                proxLlWeaknessGroup
            ),
            new Chart(
                'distalLlWeakness',
                'row',
                distalLlWeaknessDim,
                340,
                200,
                false,
                distalLlWeaknessGroup
            ),
            new Chart(
                'leftBicep',
                'row',
                leftBicepDim,
                340,
                200,
                false,
                leftBicepGroup
            ),
            new Chart(
                'rightBicep',
                'row',
                rightBicepDim,
                340,
                200,
                false,
                rightBicepGroup
            ),
            new Chart(
                'serumCk',
                'row',
                serumCkDim,
                340,
                1000,
                false,
                serumCkGroup
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
