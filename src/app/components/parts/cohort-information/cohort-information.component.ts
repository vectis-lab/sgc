import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, OnDestroy, OnInit, Input, Output } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Chart } from "../../../model/clinical-cohort-chart";
import { EventEmitter } from 'events';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-cohort-information',
    templateUrl: './cohort-information.component.html',
    styleUrls: ['./cohort-information.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CohortInformationComponent implements AfterViewInit, OnDestroy, OnInit {
    //Internal IDs
    @Input() samples: string[] = [];
    @Input() clinicalFields: ClinicalFields[] = [];
    @Input() permission: string = '';
    @Input() phenoService: string = '';
    @Input() family: boolean = false;
    @Input() pheno: any[] = [];
    includeFamily: boolean = false;
    charts: Chart[] = [];
    sampleDim: any;
    error: any;
    denied = false;
    patients;
    externalIDs: string [];
    ndx: any;
    selectedExternalIDs: string[];
    selectedInternalIDs: string[] = [];
    params: any;
    subscriptions: Subscription[] = [];
    demo: boolean = false;
    showSampleCSV: boolean = false;
    allIsChecked = false;

    constructor(private cs: ClinapiService,
                private cd: ChangeDetectorRef,
                private ClinicalFilterService: ClinicalFilteringService,
                private auth: Auth,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.subscriptions.push(this.auth.getUserPermissions().subscribe(permissions => {
            if(!permissions.includes(this.permission)){
                this.denied = true;
            }
        }));

        this.subscriptions.push(this.cs.internalSampleIDs.subscribe(samples => {
            this.selectedInternalIDs = samples;
            this.selectedExternalIDs = this.patients
                .filter(patient => this.selectedInternalIDs.includes(patient.internalIDs))
                .map(patient => patient.externalIDs);
            this.cd.detectChanges();
        }));

        this.patients = this.pheno.filter(sample => this.samples.includes(sample.internalIDs));
        this.externalIDs = this.patients.map(sample => sample.externalIDs);
        this.ndx = crossfilter(this.patients);
        this.selectedExternalIDs = this.externalIDs;
        this.loadCharts();
    }

    onSelectSamples(externalSamples){
        this.selectedExternalIDs = externalSamples;
        this.sampleDim.filter(sample => externalSamples.includes(sample));
        dc.renderAll();
        this.getVariantsFromFilter(this.selectedExternalIDs);
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
        this.getVariantsFromFilter(this.selectedExternalIDs);
    }

    loadCharts(){
        this.cs.samplesGroup = this.ndx.dimension((d) => {
            return d['internalIDs'];
        }).group();

        const all = this.ndx.groupAll();

        this.sampleDim = this.ndx.dimension(function(d){ return d.externalIDs;})

        this.charts = this.clinicalFields.map(field => {
          let dim = this.ndx.dimension(function(d){ 
            return d[field.fieldName]=== "" ? 'No data' : d[field.fieldName]
           })
          let group = dim.group();
          if(field.multivalue){
            dim = this.ndx.dimension(function(d){ return d[field.fieldName]=== "" ? 'No data' : d[field.fieldName];}, true)
            group = dim.group();
            dim = this.ndx.dimension(function(d){ return d[field.fieldName]=== "" ? 'No data' : d[field.fieldName];})
          }
          return new Chart(field.name, field.chartType, dim, field.width, field.height, field.visible, group, null, field.filterHandler)
        })

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

    checkedAll(e){
        this.allIsChecked = e.checked;
        if(this.allIsChecked){
            this.charts = this.charts.map(c => {
                c.enabled = true;
                return c;
            });
        }else{
            this.charts = this.charts.map(c => {
                c.enabled = false;
                return c;
            });
        }
    }

    toggleIncludeFamily(event){
        this.includeFamily = event.checked;
        this.getVariantsFromFilter(this.selectedExternalIDs);

    }

    getFamilyMembers(externalSamples){
        const tempFamMembers = this.patients.filter(sample => externalSamples.includes(sample.externalIDs)).map(sample => sample.familyMembers);
        let familyMembers = [];
        tempFamMembers.forEach(fam => {
            familyMembers = familyMembers.concat(fam);
        })

        return familyMembers;
    }

    getVariantsFromFilter(externalSamples){
        const familyMembers = this.getFamilyMembers(externalSamples);
        if(this.includeFamily){
            this.cs.changes.next(familyMembers)
        }else{
            this.cs.changes.next();
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
    }

}
