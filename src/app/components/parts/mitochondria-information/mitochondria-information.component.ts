import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, OnDestroy, Input, OnInit } from '@angular/core';
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
    selector: 'app-mitochondria-information',
    templateUrl: './mitochondria-information.component.html',
    styleUrls: ['./mitochondria-information.component.css'],
    providers: [ClinapiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MitochondriaInformationComponent implements OnInit, AfterViewInit, OnDestroy {
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
    showSampleText: boolean = false;
    /*chartOption = {
        title: {
          text: 'Test Echarts'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['test1','test2','test3','test4','test5']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : ['test1','test2','test3','test4','test5','test6','test7']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'low',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'high',
            type:'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }*/

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
            if(permissions.includes('mito/pheno')){
                this.getMitochondria(this.demo, true);
            }else {
                this.getMitochondria(this.demo, false)
            }
        }));

        this.subscriptions.push(this.cs.internalSampleIDs.subscribe(samples => {
            this.selectedInternalIDs = samples;
            this.selectedExternalIDs = this.patients
                .filter(patient => this.selectedInternalIDs.includes(patient.internalIDs))
                .map(patient => patient.externalIDs);
        }));
    }

    getMitochondria(demo, authorize){
        this.cs.getMitochondria(demo, authorize).subscribe(v => {
            this.patients = v.filter(sample => this.samples.includes(sample.internalIDs));
            this.externalIDs = this.patients.map(sample => sample.externalIDs);
            this.ndx = crossfilter(this.patients);
            this.cs.samplesGroup = this.ndx.dimension((d) => {
                return d.internalIDs;
            }).group();

            const all = this.ndx.groupAll();

            this.sampleDim = this.ndx.dimension(function(d){ return d.externalIDs;})

            var genderDim = this.ndx.dimension(function(d){ return d.Gender;})
            var genderGroup = genderDim.group();
            
            var conditionDim = this.ndx.dimension(function(d){ 
                return d.Condition;
            }, true);
            var conditionGroup = conditionDim.group();
            //This is needed for the filterhandler to work.
            conditionDim = this.ndx.dimension(function(d){ 
                return d.Condition;
            });

            this.charts = [
                new Chart(
                    'gender',
                    'pie',
                    genderDim,
                    340,
                    200,
                    true,
                    genderGroup,
                ),
                new Chart(
                    'conditions',
                    'row',
                    conditionDim,
                    325,
                    700,
                    true,
                    conditionGroup,
                    null,
                    (dimension, filters) => {
                        dimension.filter(null);   
                        if (filters.length === 0)
                            dimension.filter(null);
                        else
                            dimension.filterFunction(function (d) {
                                if (_.difference(filters, d).length === 0) return true;
                                return false; 
                            });
                        return filters;  
                    },
                ),

            ];


            dc.dataCount('.dc-data-count')
            .dimension(this.ndx)
            .group(all);

            dc.renderAll();

            this.cd.detectChanges();

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
