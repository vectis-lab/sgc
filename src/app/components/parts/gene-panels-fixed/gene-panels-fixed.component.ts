import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { ClinapiService } from '../../../services/clinapi.service';
import { VariantSearchService } from '../../../services/variant-search-service';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import {COHORT_PERMISSION_VSAL_PHENO_MAPPING, COHORT_VALUE_MAPPING_VSAL} from '../../../model/cohort-value-mapping'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-gene-panels-fixed',
  templateUrl: './gene-panels-fixed.component.html',
  styleUrls: ['./gene-panels-fixed.component.css'],
  providers: [ClinapiService, VariantSearchService]
})
export class GenePanelsFixedComponent implements OnInit, OnDestroy {
  panel: any;
  options: any = [{
    panel: 'Loading ...',
    count: null
  }];
  @Input() selectedGenePanel: string;
  geneList: string;
  private subscriptions: Subscription[] = [];

  constructor(public searchBarService: SearchBarService,
              private route: ActivatedRoute,
              private cs: ClinapiService,
              private auth: Auth) { }

  ngOnInit() {
    if(this.selectedGenePanel){
      this.setGenePanelValue(this.selectedGenePanel);
    }

    this.subscriptions.push(this.searchBarService.geneList.subscribe(genes => {
      this.geneList = genes;
    }));

    this.searchBarService.selectedCohort.pipe(first()).subscribe(cohort => {
      this.auth.getUserPermissions().subscribe(permissions => {
        let permitted = false;
        if(permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[cohort]) || COHORT_PERMISSION_VSAL_PHENO_MAPPING[cohort] === ''){
            permitted = true;
        }else{
            permitted = false;
        }
        this.cs.getAGHAPanel(permitted, COHORT_VALUE_MAPPING_VSAL[cohort]).subscribe(panel =>{
            this.panel = panel;
            this.options = Object.keys(panel).map(e => {
              let count = panel[e].length;
              return  {
                panel: e,
                count: count
              };
            });


          })
      });
    })

  }

  onChange(event) {
    this.setGenePanelValue(event.value);
    this.searchBarService.panel = event.value;
  }

  setGenePanelValue(value) {
    if(this.panel){
      if(this.panel[value]){
        this.geneList = this.panel[value].map(panel => panel.sym);
      }else{
        this.geneList = '';
      }
  
      this.searchBarService.setGeneList(this.geneList);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
