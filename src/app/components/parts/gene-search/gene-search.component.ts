import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import { SearchBarService, QUERY_LIST_ERROR } from '../../../services/search-bar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { Term } from '../../../model/term';

@Component({
    selector: 'app-gene-search',
    templateUrl: './gene-search.component.html',
    styleUrls: ['./gene-search.component.css']
})
export class GeneSearchComponent implements AfterViewInit, OnInit, OnDestroy {
    @Input() autocomplete: GenericAutocompleteResult<any>[];
    visible = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    private subscription: Subscription[] = [];
    queries: Term[] = [];


    constructor(public router: Router,
                public clinicalFilteringService: ClinicalFilteringService,
                public searchBarService: SearchBarService,
                private route: ActivatedRoute ) {
    }

    ngOnInit(): void {
      this.subscription.push(this.route.params.subscribe(p => {
        if (p['query']) {
          const promiseQueries= this.searchBarService.query.split(',').map(q => {
            return this.searchBarService.verifyQuery(q).then(flag => {
              if(flag){
                return new Term(q, true)
              }else{
                return new Term(q, false);
              }
            })       
          })

          Promise.all(promiseQueries).then(results => {
            this.queries = results;
            let error: boolean = false
            this.queries.forEach(q => {
              if(!q.verified){
                error = true;
              }
            })
            if(error){
              this.searchBarService.autocompleteError = QUERY_LIST_ERROR;
            }
          })
        }
        if(p['panel']){
          this.searchBarService.panel = p['panel'];
        }
      }));
    }

    ngAfterViewInit(): void {
      
    }

    addGene = (query) =>  {
      if(this.queries.indexOf(query) === -1){
        this.queries.push(new Term(query.toUpperCase(), true));
      }
    }

    search() {
      let error: boolean = false
      this.queries.forEach(q => {
        if(!q.verified){
          error = true;
        }
      })

      if(!error && this.queries.length){
        this.searchBarService.autocompleteError = '';
        this.searchBarService.query = this.queries.map(query => query.term).join();
        const obj = {query: this.searchBarService.query, panel:this.searchBarService.panel, timestamp: Date.now()};
        this.clinicalFilteringService.clearFilters();
        this.router.navigate(['/clinical/results', obj]);
      }else{
        this.searchBarService.autocompleteError = QUERY_LIST_ERROR;
      }  
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      const terms = this.queries.map(query => query.term);
      if ((value || '').trim()) {
        if(terms.indexOf(value) === -1){
          if(this.queries.map(q => q.term).indexOf(value.toUpperCase()) === -1){
            this.searchBarService.verifyQuery(value.toUpperCase()).then(flag => {
                if(flag){
                  this.queries.push(new Term(value.toUpperCase(), true));
                }else{
                  this.queries.push(new Term(value.toUpperCase(), false));
                }
              });      
          }
        }
      }

      if (input) {
        input.value = '';
      }
    }
  
    remove(query: string): void {
      const index = this.queries.map(query => query.term).indexOf(query);
  
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
          if(this.queries.map(q => q.term).indexOf(value.toUpperCase()) === -1){
            this.searchBarService.verifyQuery(value.trim().toUpperCase()).then(flag => {
              if(flag){
                this.queries.push(new Term(value.trim().toUpperCase(), true));
              }else{
                this.queries.push(new Term(value.trim().toUpperCase(), false));
              }
            });  
          }
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
