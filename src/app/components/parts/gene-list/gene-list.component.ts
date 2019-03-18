import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GENE_REGION_MAPPING } from '../../../shared/geneRegionMapping';
import { SampleSearch } from '../../../services/sample-search.service';


@Component({
  selector: 'app-gene-list',
  templateUrl: './gene-list.component.html',
  styleUrls: ['./gene-list.component.css']
})
export class GeneListComponent implements OnDestroy{
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  geneCtrl = new FormControl();
  filteredGenes: Observable<string[]>;
  genes: string[] = [];
  allGenes: string[] = Object.keys(GENE_REGION_MAPPING);

  @ViewChild('geneInput') geneInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private sampleSearch: SampleSearch) {
    this.filteredGenes = this.geneCtrl.valueChanges.pipe(
        startWith(null),
        map((gene: string | null) => gene ? this._filter(gene) : this.allGenes.slice()));
    
    sampleSearch.genes.subscribe(genes => {
      this.genes = genes;
    })
  }

  remove(gene: string): void {
    const index = this.genes.indexOf(gene);
    if (index >= 0) {
      this.genes.splice(index, 1);
    }
    this.sampleSearch.removeGene();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //Right now we only accept 1 value
    this.genes = [event.option.viewValue];
    this.geneInput.nativeElement.value = '';
    this.geneCtrl.setValue(null);
    this.sampleSearch.getSamples(this.genes)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();

    return this.allGenes.filter(gene => gene.indexOf(filterValue) === 0);
  }

  ngOnDestroy() {
    if(this.genes.length > 0){
      this.sampleSearch.clearGeneFilter();
    }
  }
}