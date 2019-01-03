import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter2';
import * as _ from 'lodash/array';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

export class MitochondriaChart {

    constructor(public name: string,
                public type: string,
                public dim: any,
                public width: number,
                public height: number,
                public enabled = false,
                public group: any,
                public filterHandler:any = null,
                public xAxisLabel: string = "",
                public yAxisLabel: string = "",
            ) {
    }
}

@Component({
    selector: 'app-mitochondria-information',
    templateUrl: './mitochondria-information.component.html',
    styleUrls: ['./mitochondria-information.component.css'],
    providers: [ClinapiService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MitochondriaInformationComponent implements AfterViewInit, OnDestroy {

    error: any;
    denied = false;
    patients = [];
    ndx: any;
    charts: MitochondriaChart[];
    params: any;
    subscriptions: Subscription[] = [];
    demo: boolean = false;
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

    ngAfterViewInit() {
        this.subscriptions.push(this.auth.userPermissions.subscribe(permissions => {
            if(permissions.includes('read:clindata')){
                this.getMitochondria(this.demo, true);
            }else {
                this.getMitochondria(this.demo, false)
            }
        }));
    }

    getMitochondria(demo, authorize){
        this.cs.getMitochondria(demo, authorize).subscribe(v => {
            this.patients = v;
            this.ndx = crossfilter(this.patients);
            this.cs.samplesGroup = this.ndx.dimension((d) => {
                return d.sampleId;
            }).group();

            const all = this.ndx.groupAll();
            
            var genderDim = this.ndx.dimension(function(d){ return d.gender;})
            var genderGroup = genderDim.group();
            
            var conditionDim = this.ndx.dimension(function(d){ 
                return d.conditions;
            }, true);
            var conditionGroup = conditionDim.group();
            //This is needed for the filterhandler to work.
            conditionDim = this.ndx.dimension(function(d){ 
                return d.conditions;
            });
            
            var alanineInCerebralSpinalFluidDim = this.ndx.dimension(function(d){ return d.alanineInCerebralSpinalFluid;});
            var alanineInCerebralSpinalFluidGroup = alanineInCerebralSpinalFluidDim.group();

            var lactateInCerebralSpinalFluidDim = this.ndx.dimension(function(d){ return d.lactateInCerebralSpinalFluid;});
            var lactateInCerebralSpinalFluidGroup = lactateInCerebralSpinalFluidDim.group();

            var alanineInSerumOrPlasmaDim = this.ndx.dimension(function(d){ return d.alanineInSerumOrPlasma;});
            var alanineInSerumOrPlasmaGroup = alanineInSerumOrPlasmaDim.group();

            var lactateInVenousBloodDim = this.ndx.dimension(function(d){ return d.lactateInVenousBlood;});
            var lactateInVenousBloodGroup = lactateInVenousBloodDim.group();

            var choiceDilatedDim = this.ndx.dimension(function(d){ return d.choiceDilated;});
            var choiceDilatedGroup = choiceDilatedDim.group();

            var choiceHyperthrophicDim = this.ndx.dimension(function(d){ return d.choiceHyperthrophic;});
            var choiceHyperthrophicGroup = choiceHyperthrophicDim.group();

            var choiceLeftVentricularNonCompactionDim = this.ndx.dimension(function(d){ return d.choiceLeftVentricularNonCompaction;});
            var choiceLeftVentricularNonCompactionGroup = choiceLeftVentricularNonCompactionDim.group();

            var choiceEndocardialFibroElastosisDim = this.ndx.dimension(function(d){ return d.choiceEndocardialFibroElastosis;});
            var choiceEndocardialFibroElastosisGroup = choiceEndocardialFibroElastosisDim.group();

            this.charts = [
                new MitochondriaChart(
                    'gender',
                    'pie',
                    genderDim,
                    340,
                    200,
                    true,
                    genderGroup,
                ),
                new MitochondriaChart(
                    'alanineInCerebralSpinalFluid',
                    'bar',
                    alanineInCerebralSpinalFluidDim,
                    340,
                    200,
                    true,
                    alanineInCerebralSpinalFluidGroup,
                    null,
                    'Alanine [Moles/volume] in Cerebral spinal fluid',
                    '# Samples',
                ),      
                new MitochondriaChart(
                    'lactateInCerebralSpinalFluid',
                    'bar',
                    lactateInCerebralSpinalFluidDim,
                    340,
                    200,
                    true,
                    lactateInCerebralSpinalFluidGroup,
                    null,
                    'Lactate [Moles/volume] in Cerebral spinal fluid',
                    '# Samples',
                ),
                new MitochondriaChart(
                    'alanineInSerumOrPlasma',
                    'bar',
                    alanineInSerumOrPlasmaDim,
                    340,
                    200,
                    true,
                    alanineInSerumOrPlasmaGroup,
                    null,
                    'Alanine [Moles/volume] in Serum or Plasma',
                    '# Samples',
                ),
                new MitochondriaChart(
                    'lactateInVenousBlood',
                    'bar',
                    lactateInVenousBloodDim,
                    340,
                    200,
                    false,
                    lactateInVenousBloodGroup,
                    null,
                    'Lactate [Moles/volume] in Venous blood',
                    '# Samples',
                ),
                new MitochondriaChart(
                    'choiceDilated',
                    'pie',
                    choiceDilatedDim,
                    340,
                    200,
                    true,
                    choiceDilatedGroup,
                ),
                new MitochondriaChart(
                    'choiceHyperthrophic',
                    'pie',
                    choiceHyperthrophicDim,
                    340,
                    200,
                    false,
                    choiceHyperthrophicGroup,
                ),
                new MitochondriaChart(
                    'choiceLeftVentricularNonCompaction',
                    'pie',
                    choiceLeftVentricularNonCompactionDim,
                    340,
                    200,
                    false,
                    choiceLeftVentricularNonCompactionGroup,
                ),
                new MitochondriaChart(
                    'choiceEndocardialFibroElastosis',
                    'pie',
                    choiceEndocardialFibroElastosisDim,
                    340,
                    200,
                    false,
                    choiceEndocardialFibroElastosisGroup,
                ),
                new MitochondriaChart(
                    'conditions',
                    'row',
                    conditionDim,
                    325,
                    700,
                    true,
                    conditionGroup,
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
