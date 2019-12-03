import 'hammerjs';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ProgramCardComponent } from './components/parts/program-card/program-card.component';
import { CohortCardComponent } from './components/parts/cohort-card/cohort-card.component';
import { AboutComponent } from './components/pages/about/about.component';
import { InitiativesComponent } from './components/pages/initiatives/initiatives.component';
import { ColumnChartComponent } from './components/parts/charts/column-chart.component';
import { PieChartComponent } from './components/parts/charts/pie-chart.component';
import { CohortListComponent } from './components/parts/cohort-list/cohort-list.component';
import { InitiativeService } from './services/project-data/initiative-service';
import { CohortService } from './services/project-data/cohort-service';
import { GenomicsEnglandService } from './services/genomics-england.service';
import { SearchComponent } from './components/pages/search/search.component';
import { SearchResultsComponent } from './components/parts/search-results/search-results.component';
import { AlleleFreqComponent } from './components/parts/allele-freq/allele-freq.component';
import { VsalService } from './services/vsal-service';
import { Auth } from './services/auth-service';
import { RegionService } from './services/autocomplete/region-service';
import { SearchBarComponent } from './components/parts/search-bar/search-bar.component';
import { SearchOptionComponent } from './components/parts/search-option/search-option.component';
import { BeaconComponent } from './components/pages/beacon/beacon.component';
import { SearchBarWithOptionsComponent } from './components/parts/search-bar-with-options/search-bar-with-options.component';
import { HeaderNavComponent } from './components/parts/header-nav/header-nav.component';
import { ScrollService } from './services/scroll-service';
import { SideNavComponent } from './components/parts/side-nav/side-nav.component';
import { EnsemblService } from './services/ensembl-service';
import { GeneInformationComponent } from './components/parts/gene-information/gene-information.component';
import { BeaconNetworkService } from './services/beacon/beacon-network-service';
import { PrivacyFooterComponent } from './components/parts/privacy-footer/privacy-footer.component';
import { ElasticGeneSearch } from './services/autocomplete/elastic-gene-search-service';
import { VariantsTableComponent } from './components/parts/variants-table/variants-table.component';
import { PositionService } from './services/autocomplete/position-service';
import { TableService } from './services/table-service';
import { TableFamilyService } from './services/table-family-service';
import { TableSummaryService } from './services/table-summary-service';
import { FilterAutoComponent } from './components/parts/filter-auto/filter-auto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from './components/parts/page-container/page-container.component';
import { RegionInformationComponent } from './components/parts/region-information/region-information.component';
import { LocalStorageService } from './services/local-storage.service';
import { environment } from '../environments/environment';
import { VariantComponent } from './components/pages/variant/variant.component';
import { BeaconTableComponent } from './components/parts/beacon-table/beacon-table.component';
import * as Raven from 'raven-js';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorComponent } from './components/pages/error/error.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { DashboardComponent } from './components/parts/dashboard/dashboard.component';
import { VariantsTablePaginatedComponent } from './components/parts/variants-table-paginated/variants-table-paginated.component';
import { ErrorDialogComponent } from './components/parts/error-dialog/error-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarDemoComponent } from './components/parts/snackbar-demo/snackbar-demo.component';
import { MaterialModule } from './app.material';
import { MapdRowChartComponent } from './components/parts/mapd-row-chart/mapd-row-chart.component';
import { MapdPieChartComponent } from './components/parts/mapd-pie-chart/mapd-pie-chart.component';
import { MapdAvgAfChartComponent } from './components/parts/mapd-avg-af-chart/mapd-avg-af-chart.component';
import { HelpIconComponent } from './components/parts/help-icon/help-icon.component';
import { SnackbarHelpComponent } from './components/parts/snackbar-help/snackbar-help.component';
import { LoadingComponent } from './components/pages/loading/loading.component';
import { SignUpComponent } from './components/parts/sign-up/sign-up.component';
import { AuthGuardComponent } from './components/parts/auth-guard/auth-guard.component';
import { ClinicalFilteringService } from './services/clinical-filtering.service';
import { SavedSearchesComponent } from './components/parts/saved-searches/saved-searches.component';
import { CohortsComponent } from './components/parts/cohorts/cohorts.component';
import { NeuromuscularInformationComponent } from './components/parts/neuromuscular-information/neuromuscular-information.component';
import { ClinicalCohortChartComponent } from './components/parts/clinical-cohort-chart/clinical-cohort-chart.component';
import { SearchBarService } from './services/search-bar-service';
import { MitochondriaInformationComponent } from './components/parts/mitochondria-information/mitochondria-information.component';
import { VariantsSummaryTableComponent } from './components/parts/variants-summary-table/variants-summary-table.component';
import { GenomeBrowserSummaryComponent } from './components/parts/genome-browser-summary/genome-browser-summary.component';
import { GenomeBrowserSummaryResizableComponent } from './components/parts/genome-browser-summary-resizable/genome-browser-summary-resizable.component';
import { OverlayMenuSummaryComponent } from './components/parts/overlay-menu-summary/overlay-menu-summary.component';
import { FilterAutoSummaryComponent } from './components/parts/filter-auto-summary/filter-auto-summary.component';
import { SampleSearch } from './services/sample-search.service';
import { ClinicalComponent } from './components/pages/clinical/clinical.component';
import { ClinicalFilteringComponent } from './components/parts/clinical-filtering/clinical-filtering.component';
import { GeneSearchComponent } from './components/parts/gene-search/gene-search.component';
import { SearchBarClinicalComponent } from './components/parts/search-bar-clinical/search-bar-clinical.component';
import { GenePanelsComponent } from './components/parts/gene-panels/gene-panels.component';
import { GenePanelsFixedComponent } from './components/parts/gene-panels-fixed/gene-panels-fixed.component';
import { SamplesTextComponent } from './components/parts/samples-text/samples-text.component';
import { VariantSummaryComponent } from './components/pages/variant-summary/variant-summary.component';
import { SamplesListComponent } from './components/parts/samples-list/samples-list.component';
import { AcutecareInformationComponent } from './components/parts/acutecare-information/acutecare-information.component';
import { CohortInformationComponent } from './components/parts/cohort-information/cohort-information.component';
import { AlleleFreqSummaryComponent } from './components/parts/allele-freq-summary/allele-freq-summary.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent, ChangePasswordDialog } from './components/pages/profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AutocompleteOptionComponent } from './components/parts/autocomplete-option/autocomplete-option.component';
import { LeukodystrophiesInformationComponent } from './components/parts/leukodystrophies-information/leukodystrophies-information.component';
import { BrainMalformationsInformationComponent } from './components/parts/brain-malformations-information/brain-malformations-information.component';
import { EpilepticEncephalopathiesInformationComponent } from './components/parts/epileptic-encephalopathies-information/epileptic-encephalopathies-information.component';
import { IcconInformationComponent } from './components/parts/iccon-information/iccon-information.component';
import { FamilyTabComponent } from './components/parts/family-tab/family-tab.component';
import { VariantsFamilyTableComponent } from './components/parts/variants-family-table/variants-family-table.component';
import { FilterAutoFamilyComponent } from './components/parts/filter-auto-family/filter-auto-family.component';
import { DemoInformationComponent } from './components/parts/demo-information/demo-information.component';
import { FamilyTabNewComponent } from './components/parts/family-tab-new/family-tab-new.component';
import { RelationshipInformationComponent } from './components/parts/relationship-information/relationship-information.component';
import { FamilialFiltersComponent } from './components/parts/familial-filters/familial-filters.component';
import { ChildranzInformationComponent } from './components/parts/childranz-information/childranz-information.component';
import { HiddenInformationComponent } from './components/parts/hidden-information/hidden-information.component';
import { GeneticImmunologyInformationComponent } from './components/parts/genetic-immunology-information/genetic-immunology-information.component';
import { CardiacInformationComponent } from './components/parts/cardiac-information/cardiac-information.component';
import { KidgenInformationComponent } from './components/parts/kidgen-information/kidgen-information.component';

const CRITICAL_ERROR_WAIT_DURATION = 1000;

Raven
    .config(environment.sentryUrl)
    .install();

Raven.setDataCallback(function (data) {
    return data;
});

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        if (!environment.production) {
            console.error(err);
        } else {
            Raven.captureException(err);
            window.setTimeout(() => {
                window.location.href = 'error';
            }, CRITICAL_ERROR_WAIT_DURATION);
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule,
        NgxPaginationModule,
        NgxDatatableModule,
        MaterialModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        SearchBarComponent,
        SearchComponent,
        SearchResultsComponent,
        AlleleFreqComponent,
        ColumnChartComponent,
        ProgramCardComponent,
        CohortCardComponent,
        AboutComponent,
        InitiativesComponent,
        PieChartComponent,
        CohortListComponent,
        SearchOptionComponent,
        BeaconComponent,
        SearchBarWithOptionsComponent,
        HeaderNavComponent,
        SideNavComponent,
        GeneInformationComponent,
        PrivacyFooterComponent,
        VariantsTableComponent,
        FilterAutoComponent,
        PageContainerComponent,
        RegionInformationComponent,
        VariantComponent,
        BeaconTableComponent,
        ErrorComponent,
        ExploreComponent,
        DashboardComponent,
        VariantsTablePaginatedComponent,
        ErrorDialogComponent,
        SnackbarDemoComponent,
        MapdRowChartComponent,
        MapdPieChartComponent,
        MapdAvgAfChartComponent,
        HelpIconComponent,
        SnackbarHelpComponent,
        LoadingComponent,
        SignUpComponent,
        AuthGuardComponent,
        SavedSearchesComponent,
        CohortsComponent,
        NeuromuscularInformationComponent,
        ClinicalCohortChartComponent,
        MitochondriaInformationComponent,
        VariantsSummaryTableComponent,
        GenomeBrowserSummaryComponent,
        GenomeBrowserSummaryResizableComponent,
        OverlayMenuSummaryComponent,
        FilterAutoSummaryComponent,
        ClinicalComponent,
        ClinicalFilteringComponent,
        GeneSearchComponent,
        SearchBarClinicalComponent,
        GenePanelsComponent,
        GenePanelsFixedComponent,
        SamplesTextComponent,
        VariantSummaryComponent,
        SamplesListComponent,
        AcutecareInformationComponent,
        CohortInformationComponent,
        AlleleFreqSummaryComponent,
        HomeComponent,
        ProfileComponent,
        ChangePasswordDialog,
        AutocompleteOptionComponent,
        LeukodystrophiesInformationComponent,
        BrainMalformationsInformationComponent,
        EpilepticEncephalopathiesInformationComponent,
        IcconInformationComponent,
        FamilyTabComponent,
        VariantsFamilyTableComponent,
        FilterAutoFamilyComponent,
        DemoInformationComponent,
        FamilyTabNewComponent,
        RelationshipInformationComponent,
        FamilialFiltersComponent,
        ChildranzInformationComponent,
        HiddenInformationComponent,
        GeneticImmunologyInformationComponent,
        CardiacInformationComponent,
        KidgenInformationComponent,
    ],
    entryComponents: [
        SignUpComponent,
        ErrorDialogComponent,
        SnackbarDemoComponent,
        SnackbarHelpComponent,
        ChangePasswordDialog
    ],
    providers: [
        Auth,
        InitiativeService,
        CohortService,
        VsalService,
        ElasticGeneSearch,
        RegionService,
        BeaconNetworkService,
        ScrollService,
        EnsemblService,
        PositionService,
        TableService,
        TableFamilyService,
        TableSummaryService,
        LocalStorageService,
        ClinicalFilteringService,
        SearchBarService,
        { provide: ErrorHandler, useClass: RavenErrorHandler },
        { provide: 'NULL_VALUE', useValue: null },
        SampleSearch,
        GenomicsEnglandService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
