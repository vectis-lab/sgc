import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy,Output, EventEmitter } from '@angular/core';
import * as dc from 'dc';
import { Chart } from '../neuromuscular-information/neuromuscular-information.component';
import { ClinapiService } from '../../../services/clinapi.service';
import { HelperService } from '../../../services/helper.service';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { SearchBarService } from '../../../services/search-bar-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-clinical-cohort-chart',
    templateUrl: './clinical-cohort-chart.component.html',
    styleUrls: ['./clinical-cohort-chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClinicalCohortChartComponent implements AfterViewInit, OnDestroy {
    @Input() data: Chart;
    chart: any;
    saveSearches = {};
    subscriptions: Subscription[] = [];
    filter = [];
    @Output() hiddenChart = new EventEmitter<string>();
    hover: boolean = false;
    scrolledRowChart: boolean = false;
    selectedCohort = "";


    constructor(private cd: ChangeDetectorRef, private cs: ClinapiService, private hs: HelperService, private ClinicalFilterService: ClinicalFilteringService, private searchBarService: SearchBarService) {
    }

    ngAfterViewInit(): void {
        if (this.data.type === "row") {
            this.initRowChart();
        } else if (this.data.type === "pie"){
            this.initPie();
        }else if (this.data.type === "bar"){
            this.initBarChart();
        }

        this.subscriptions.push(this.searchBarService.cohort.subscribe(cohort => {
            this.selectedCohort = cohort;
        }))

        this.chart.on("filtered", (c) => {
            this.cd.detectChanges();
            this.cs.changes.next();
            this.filter = this.chart.filters();
            this.ClinicalFilterService.setFilters(this.data.name, this.chart.filters());
        });

        this.subscriptions.push(this.ClinicalFilterService.savedSearches.subscribe(ss => {
            this.saveSearches = ss
        }))

        this.subscriptions.push(this.ClinicalFilterService.savedSearchesName.subscribe(name => {
            let objKeys = Object.keys(this.saveSearches[this.selectedCohort][name])
            if(objKeys.includes(this.data.name)){
                objKeys.forEach(dim => {
                    if(dim === this.data.name){
                        if(this.data.type === "pie")
                            this.chart.replaceFilter(this.saveSearches[this.selectedCohort][name][dim]);
                        if(this.data.type === "bar")
                            this.chart.replaceFilter(this.saveSearches[[this.selectedCohort][name][dim][0]);
                        if(this.data.type === "row"){
                            this.chart.filter(null)
                            this.chart.filter([this.saveSearches[this.selectedCohort][name][dim]])
                        }
                    }
                })
            }else{
                this.chart.filter(null);
            }
            this.chart.redrawGroup();
        }))

        this.chart.render();
        this.cd.detectChanges();
    }

    initPie() {
        this.chart = dc.pieChart(`.chart .${this.data.name}`)
            .width(this.data.width)
            .height(this.data.height)
            .innerRadius(30)
            .slicesCap(10)
            .dimension(this.data.dim)
            .group(this.data.group)
            .title(() => this.data.name);
        if(this.ClinicalFilterService.filters[this.data.name] !== undefined){
            this.ClinicalFilterService.filters[this.data.name].forEach(filter => {
                this.chart.filter(filter);
            })
        }      
        if (this.data.filterHandler !== null) {
            this.chart.filterHandler(this.data.filterHandler);
        }
    }

    initRowChart() {
        if(this.data.group.all().length > 8){
            this.scrolledRowChart = true;
        }
        this.chart = dc.rowChart(`.chart .${this.data.name}`)                                                                           
                    .width(this.data.width)
                    .height(this.data.height)
                    .group(this.data.group)
                    .elasticX(true)
                    .dimension(this.data.dim)
        if(this.ClinicalFilterService.filters[this.data.name]){
            this.ClinicalFilterService.filters[this.data.name].forEach(filter => {
                this.chart.filter(filter);
            })
        }        
        if (this.data.filterHandler !== null) {
            this.chart.filterHandler(this.data.filterHandler);
        }
    }

    initBarChart() {
        this.chart = dc.barChart(`.chart .${this.data.name}`)
            .width(this.data.width)
            .height(this.data.height)
            .x(d3.scale.linear().domain([0, 100]))
            .elasticY(true)
            .yAxisLabel(this.data.yAxisLabel)
            .xAxisLabel(this.data.xAxisLabel)
            .dimension(this.data.dim)
            .group(this.data.group);

        this.chart.yAxis().ticks(3);
        if(this.ClinicalFilterService.filters[this.data.name]){
            this.ClinicalFilterService.filters[this.data.name].forEach(filter => {
                this.chart.filter(filter);
            })
        }
        if (this.data.filterHandler !== null) {
            this.chart.filterHandler(this.data.filterHandler);
        }
    }

    resetFilter(){
        this.chart.filter(null);
        this.ClinicalFilterService.deleteFilter(this.data.name);
        this.chart.redrawGroup();
    }

    hideChart(){
        this.hiddenChart.emit(this.data.name);
    }

    capitalizeCamelCase(data){
        return this.hs.capitalizeCamelCase(data);
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach((s => s.unsubscribe()));
        dc.chartRegistry.deregister(this.chart)
    }
}
