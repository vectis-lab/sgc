import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import '@mapd/mapdc/dist/mapdc.js';
import { Subscription } from 'rxjs/Subscription';
import { constants } from '../../../app.constants';
import { SearchBarService } from '../../../services/search-bar-service';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { MatCheckboxChange, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import * as Raven from 'raven-js';
import { environment } from '../../../../environments/environment';
import { ChartsService, ChartType } from '../../../services/charts.service';
import { Region } from '../../../model/region';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { Gene } from '../../../model/gene';
import { Position } from '../../../model/position';
import { Dimension, BasicFilter, DimensionFilter, MapdFilterService } from '../../../services/mapd-filter.service';
import { SnackbarHelpComponent } from '../snackbar-help/snackbar-help.component';
import { VariantsTablePaginatedComponent } from '../variants-table-paginated/variants-table-paginated.component';
import { RsidService } from '../../../services/autocomplete/rsid-service';
import { Rsid } from '../../../model/rsid';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth-service';

const SMALL_WIDTH = 720;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [SearchBarService,
        MapdService,
        CrossfilterService,
        ChartsService,
        MapdFilterService,
        RsidService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(VariantsTablePaginatedComponent)
    private variantTable: VariantsTablePaginatedComponent;
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH}px)`);
    subscriptions: Subscription[] = [];

    query: string = null;
    error = '';
    searchError = '';
    loading = false;
    showSql = false;
    total = 0;
    subtotal = 0;
    sql = '';
    helpEnabled = false;
    cohort: string = null;
    permissions = [];

    errors = new Subject<any>();

    chartType = ChartType;

    constructor(public searchBarService: SearchBarService,
                private cd: ChangeDetectorRef,
                private mapd: MapdService,
                private auth: Auth,
                public cf: CrossfilterService,
                public dialog: MatDialog,
                public cs: ChartsService,
                public rsids: RsidService,
                public snackBar: MatSnackBar,
                public router: Router,) {
        this.searchBarService.autocompleteServices.push(rsids);
        this.subscriptions.push(this.errors.subscribe((e) => {
            if(e !== '' || e !== constants.GENERIC_SERVICE_ERROR_MESSAGE){
                Raven.captureMessage(e);
            }

            this.error = e;
            this.cd.detectChanges();
        }));
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        this.subscriptions.push(this.auth.getUserPermissions().subscribe(permissions => {
            this.permissions = permissions;                  
    }));

        this.subscriptions.push(this.cf.updates.debounceTime(100).subscribe(() => {
            const p1 = this.cf.x.sizeAsync().then((v) => {
                this.total = v;
            });
            const p2 = this.cf.all.valueAsync().then((v) => {
                this.subtotal = v;
                this.loading = false;
            });
            this.sql = this.cf.getFilterString();
            this.cf.currentFilters = this.cf.x.getFilter().filter((x) => x);
            Promise.all([p1, p2]).then(() => this.cd.detectChanges());
        }));
    }

    clearFilters() {
        this.searchBarService.query = '';
        this.cf.mfs.clearFilters();
        dc.filterAll();
        dc.redrawAllAsync().then(() => {
            this.cf.updates.next();
        }).catch((e) => this.errors.next(constants.GENERIC_SERVICE_ERROR_MESSAGE));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    addGeneOrRegion = (q) => {
        //Later cohort will be used
        const cohort = this.searchBarService.options[0].getValue();
        this.searchBarService.query = q;
        const obj = {query: q};
        this.searchError = '';
        this.errors.next('');

        if(
            (cohort === "Mitochondria" && this.permissions.includes('mito/summary')) || 
            (cohort === "Acutecare" && this.permissions.includes('acutecare/summary')) || 
            (cohort === "Neuromuscular" && this.permissions.includes('neuromuscular/summary'))
        ){
            if(this.mapd.session === null || this.cohort !== cohort){
                if(this.mapd.session){
                    this.cf.mfs.clearFilters();
                }
                this.loading = true;
                this.mapd.connect().then((session) => {;
                    return this.cf.create(session, 'mgrb');
                }).then(() => {
                    if(!q){
                        this.cf.updates.next();
                        this.cd.detectChanges();
                    }else{
                        this.searchBarService.searchWithParams(obj).then((v: GenericAutocompleteResult<Gene | Region | Position | Rsid>) => {  
                            if (!v) {
                                return;
                            }
                            if (v.result instanceof Gene) {
                                const f = new DimensionFilter();
                                f.dimension = new Dimension();
                                f.dimension.name = 'geneSymbol';
                                f.operator = '=';
                                f.value = v.result.symbol;
                                this.cf.mfs.addFilter(f);
                            } else if (v.result instanceof Region) {
                                const r = (<Region>v.result);
                                const f = new BasicFilter(`chromosome='${r.chromosome}' AND c3_START >= ${r.start} AND c3_START <= ${r.end}`);
                                this.cf.mfs.addFilter(f);
                            } else if (v.result instanceof Position) {
                                const p = (<Position>v.result);
                                const f = new BasicFilter(`chromosome='${p.chromosome}' AND c3_START >= ${p.start} AND c3_START <= ${p.end}`);
                                this.cf.mfs.addFilter(f);
                            } else if (v.result instanceof Rsid) {
                                const f = new BasicFilter(`rsid='${v.result.name().toLowerCase()}'`);
                                this.cf.mfs.addFilter(f);
                            }
    
                            this.cf.updates.next();
                            this.cd.detectChanges(); 
                        }).catch(e => {
                            this.loading=false;
                            this.searchError = e;
                            this.cd.detectChanges();
                        });
                    }
                }).catch((e) => this.errors.next(constants.GENERIC_SERVICE_ERROR_MESSAGE));
            }else{
                if(q){
                    this.searchBarService.searchWithParams(obj).then((v: GenericAutocompleteResult<Gene | Region | Position | Rsid>) => {
                        this.cf.mfs.clearFilters();
                        dc.filterAll();
                        
                        if (!v) {
                            return;
                        }
                        if (v.result instanceof Gene) {
                            const f = new DimensionFilter();
                            f.dimension = new Dimension();
                            f.dimension.name = 'geneSymbol';
                            f.operator = '=';
                            f.value = v.result.symbol;
                            this.cf.mfs.addFilter(f);
                        } else if (v.result instanceof Region) {
                            const r = (<Region>v.result);
                            const f = new BasicFilter(`chromosome='${r.chromosome}' AND c3_START >= ${r.start} AND c3_START <= ${r.end}`);
                            this.cf.mfs.addFilter(f);
                        } else if (v.result instanceof Position) {
                            const p = (<Position>v.result);
                            const f = new BasicFilter(`chromosome='${p.chromosome}' AND c3_START >= ${p.start} AND c3_START <= ${p.end}`);
                            this.cf.mfs.addFilter(f);
                        } else if (v.result instanceof Rsid) {
                            const f = new BasicFilter(`rsid='${v.result.name().toLowerCase()}'`);
                            this.cf.mfs.addFilter(f);
                        }
            
                        dc.redrawAllAsync().then(() => {
                            this.cf.updates.next();
                            this.cd.detectChanges();
                        }).catch((e) => this.errors.next(constants.GENERIC_SERVICE_ERROR_MESSAGE));
                    }).catch(e => {
                        this.loading=false;
                        this.searchError = e;
                        this.cd.detectChanges();
                    });
                }else{
                    this.clearFilters();
                }
            }
        }else{
            if(this.permissions){
                this.errors.next(constants.PERMISSION_ERROR_MESSAGE);
            }
        }
        

        this.cohort = cohort;

        
    };

    toggleSql($event) {
        $event.stopPropagation();
        this.showSql = !this.showSql;
    }

    toggleNullValues($event) {
        $event.stopPropagation();
        this.cs.showNullValues = !this.cs.showNullValues
        this.loading = true;
        this.cd.detectChanges();
        this.loading = false;
        this.cd.detectChanges();
    }

    updateNullValues(v: MatCheckboxChange) {
        this.cs.showNullValues = v.checked;
        this.loading = true;
        this.cd.detectChanges();
        this.loading = false;
        this.cd.detectChanges();
    }

    toggleChart($event, chart) {
        $event.stopPropagation();
        chart.enabled = !chart.enabled;
    }

    downloadVariants() {
        this.variantTable.downloadFile();
    }

    isSmallScreen(): boolean {
        return this.mediaMatcher.matches;
    }

    toggleHelp() {
        if (!this.helpEnabled) {
            const snackBarRef = this.snackBar.openFromComponent(SnackbarHelpComponent);
            snackBarRef.afterDismissed().subscribe(() => {
                this.helpEnabled = false;
                this.cd.detectChanges();
            });
        } else {
            this.snackBar.dismiss();
        }

        this.helpEnabled = !this.helpEnabled;
    }
}
