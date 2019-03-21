import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
import {map, startWith} from 'rxjs/operators';
import { GENE_REGION_MAPPING } from '../../../shared/geneRegionMapping';
import { SampleSearch } from '../../../services/sample-search.service';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

@Component({
  selector: 'app-gene-list',
  templateUrl: './gene-list.component.html',
  styleUrls: ['./gene-list.component.css']
})
export class GeneListComponent implements OnDestroy, AfterViewInit{
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  geneCtrl = new FormControl();
  filteredGenes: Observable<string[]>;
  genes: string[] = [];
  allGenes: string[] = Object.keys(GENE_REGION_MAPPING);
  private subscriptions: Subscription[] = [];
  private loadingSample = false;
  private error: any;

  @ViewChild('geneInput') geneInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private sampleSearch: SampleSearch,
              private cfs: ClinicalFilteringService,
              private cdRef:ChangeDetectorRef) {
    this.filteredGenes = this.geneCtrl.valueChanges.pipe(
        startWith(null),
        map((gene: string | null) => gene ? this._filter(gene) : this.allGenes.filter(gene => !this.genes.includes(gene)).slice()));   
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(this.sampleSearch.genesFilter.subscribe(genes => {
      this.genes = genes;
      this.cdRef.detectChanges();
    }))

    this.subscriptions.push(this.sampleSearch.sampleLoading.subscribe(loading => {
      this.loadingSample = loading;
    }))

    this.subscriptions.push(this.sampleSearch.error.subscribe(e => {
        this.error = e;
    }))
  }

  remove(gene: string): void {
    const index = this.genes.indexOf(gene);
    if (index >= 0) {
      this.genes.splice(index, 1);
    }
    this.sampleSearch.error.next(null);
    this.sampleSearch.removeGene(gene);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genes.push(event.option.viewValue);
    this.geneInput.nativeElement.value = '';
    this.geneCtrl.setValue(null);
    this.sampleSearch.error.next(null);
    this.sampleSearch.getSamples(this.genes)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.allGenes.filter(gene => gene.indexOf(filterValue) === 0 && !this.genes.includes(gene));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}