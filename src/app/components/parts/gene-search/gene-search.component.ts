import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
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
export class GeneSearchComponent implements AfterViewInit, OnInit {
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

      this.subscription.push(this.searchBarService.geneList.subscribe(queries => {
        this.queries = queries;
      }))
    }

    ngAfterViewInit(): void {
      
    }

    addGene = (query) =>  {
      if(this.queries.indexOf(query) === -1){
        this.queries.push(query.toUpperCase());
        this.searchBarService.setGeneList(this.queries);
      }
    }

    search() {
      this.searchBarService.query = this.queries.join();
      const obj = {query: this.searchBarService.query, timestamp: Date.now()};
      this.clinicalFilteringService.clearFilters();
      this.router.navigate(['/clinical/results', obj]);
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        if(this.queries.indexOf(value) === -1){
          this.queries.push(value.toUpperCase());
          this.searchBarService.setGeneList(this.queries);
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
        this.searchBarService.setGeneList(this.queries);
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

    clear() {
      this.searchBarService.setGeneList([]);
    }

}
