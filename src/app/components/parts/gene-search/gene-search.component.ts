import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import { SearchBarService } from '../../../services/search-bar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';

@Component({
    selector: 'app-gene-search',
    templateUrl: './gene-search.component.html',
    styleUrls: ['./gene-search.component.css']
})
export class GeneSearchComponent implements AfterViewInit, OnInit, OnDestroy {
    @Input() autocomplete: GenericAutocompleteResult<any>[];
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    private subscription: Subscription[] = [];
    queries: string[] = [];

    constructor(public router: Router,
                public clinicalFilteringService: ClinicalFilteringService,
                public searchBarService: SearchBarService,
                private route: ActivatedRoute ) {
    }

    ngOnInit(): void {
      this.subscription.push(this.route.params.subscribe(p => {
        if (p['query']) {
          this.queries = this.searchBarService.query.split(',');
        }
      }));
    }

    ngAfterViewInit(): void {
      
    }

    addGene = (query) =>  {
      if(this.queries.indexOf(query) === -1){
        this.queries.push(query.toUpperCase());
      }
    }

    search() {
      this.searchBarService.query = this.queries.join();
      const obj = {query: this.searchBarService.query, panel:this.searchBarService.panel, timestamp: Date.now()};
      this.clinicalFilteringService.clearFilters();
      this.router.navigate(['/clinical/results', obj]);
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        if(this.queries.indexOf(value) === -1){
          this.queries.push(value.toUpperCase());
        }
      }
      if (input) {
        input.value = '';
      }
    }
  
    remove(query: string): void {
      const index = this.queries.indexOf(query);
  
      if (index >= 0) {
        this.queries.splice(index, 1);
      }
    }

    paste(event: ClipboardEvent): void {
      event.preventDefault();
      event.clipboardData
      .getData('Text')
      .split(/;|,|\n/)
      .forEach(value => {
        if(value.trim()){
          this.queries.push(value.trim());
        }
      })
    }

    clearFilter() {
      this.queries = [];
      this.searchBarService.query = '';
      this.searchBarService.panel = '';
      this.searchBarService.setGeneList('');
    }

    ngOnDestroy() {
      this.subscription.forEach(s => {s.unsubscribe()});
    }

}
