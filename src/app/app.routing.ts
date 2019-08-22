import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoadingComponent } from './components/pages/loading/loading.component';
import { SearchComponent } from './components/pages/search/search.component';
import { BeaconComponent } from './components/pages/beacon/beacon.component';
import { VariantComponent } from './components/pages/variant/variant.component';
import { VariantSummaryComponent } from './components/pages/variant-summary/variant-summary.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { ClinicalComponent } from './components/pages/clinical/clinical.component';
import { CohortAuthorsComponent } from './components/pages/cohort-authors/cohort-authors.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about',  component: AboutComponent },
    { path: 'clinical', component: ClinicalComponent },
    { path: 'profile',  component: ProfileComponent },
    { path: 'clinical/results', component: ClinicalComponent },
    { path: 'auth',  component: LoadingComponent },
    { path: 'search/results', component: SearchComponent },
    { path: 'clinical/variant', component: VariantComponent },
    { path: 'search/variant-summary', component: VariantSummaryComponent },
    { path: 'search', component: SearchComponent },
    { path: 'explore/:cohort', component: ExploreComponent },
    { path: 'beacon', component: BeaconComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'authors', component: CohortAuthorsComponent },
    { path: '', redirectTo: '/', pathMatch: 'full'},
    { path: '**', redirectTo: '/', pathMatch: 'full'},
];

export const routing = RouterModule.forRoot(appRoutes);
