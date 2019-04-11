import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../../services/search-bar-service';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackbarDemoComponent } from '../../parts/snackbar-demo/snackbar-demo.component';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

const SMALL_WIDTH = 720;

@Component({
  selector: 'app-clinical',
  templateUrl: './clinical.component.html',
  styleUrls: ['./clinical.component.css'],
  providers: [ SearchBarService ]
})
export class ClinicalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  sbSub: Subscription = null;
  autocomplete: GenericAutocompleteResult<any>[];
  error = '';
  searching = false;
  sb: MatSnackBarRef<SnackbarDemoComponent> = null;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH}px)`);
  selectedOption: string;
  private geneList: string = '';

  constructor(public searchBarService: SearchBarService,
              public auth: Auth,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              public snackBar: MatSnackBar,
              private router: Router,
              private clinicalFilteringService: ClinicalFilteringService
          ) {
      if (auth.authenticated()) {
          this.subscriptions.push(route.params.subscribe(p => this.parseParams(p)));
      }
  }
  ngOnInit(): void {
      this.selectedOption = this.searchBarService.options[0].getValue();

      this.subscriptions.push(this.auth.getSavedSearches().subscribe(savedSearches => {
          this.clinicalFilteringService.initSaveSearches(savedSearches);
      }))

      this.subscriptions.push(this.auth.getUserPermissions().subscribe(permissions => {
          this.auth.setUserPermissions(permissions);
      }))

      this.subscriptions.push(this.searchBarService.geneList.subscribe(genes => {
        this.geneList = genes;
      }))
      }

  parseParams(params: Params) {
      if (!params['query'] && !this.geneList) {
          return;
      }
      if (params['demo']) {
          this.sb = this.snackBar.openFromComponent(SnackbarDemoComponent, {
              extraClasses: ['snack-bar-demo-container'],
              verticalPosition: 'top'
          });
          this.sbSub = this.sb.afterDismissed().subscribe(() => {
              this.searchBarService.search(params['query']);
          });
      } else {
          this.dismissSnackBar();
      }
      this.error = '';
      this.autocomplete = null;
      this.searching = true;
      this.searchBarService.searchWithMultipleParams(params).then((v) => {
          this.autocomplete = v;
          this.cd.detectChanges();
      }).catch(() => {
      });
  }

  ngOnDestroy() {
      this.subscriptions.forEach((s => s.unsubscribe()));
      this.clinicalFilteringService.clearFilters();
      this.dismissSnackBar();
  }

  handleError(e: string) {
      this.error = e;
  }

  isSmallScreen(): boolean {
      return this.mediaMatcher.matches;
  }

  private dismissSnackBar() {
      if (this.sb) {
          this.sbSub.unsubscribe();
          this.sbSub = null;
          this.sb.dismiss();
          this.sb = null;
      }
  }

}
