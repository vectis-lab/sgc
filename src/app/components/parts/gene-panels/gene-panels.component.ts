import { Component, OnInit, OnDestroy, Input,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import * as GenePanels from '../../../shared/genePanels';
import { SearchBarService } from '../../../services/search-bar-service';
import { GenomicsEnglandService } from '../../../services/genomics-england.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gene-panels',
  templateUrl: './gene-panels.component.html',
  styleUrls: ['./gene-panels.component.css']
})
export class GenePanelsComponent implements OnInit, OnDestroy, AfterViewInit {
  /*options: object[] = [
    //{label: 'Mitochondrial disorders', value: "MITOCHONDRIAL_DISORDERS"},
    {label: 'Mitochondrial liver disease', value: "MITOCHONDRIAL_LIVER_DISEASE"}
  ];*/
  options: string[] = [];
  @Input() selectedGenePanel: string;
  geneList: string;
  loading: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(public searchBarService: SearchBarService,
              private route: ActivatedRoute,
              private genomicsEnglandService: GenomicsEnglandService,
              private cd: ChangeDetectorRef,) { }

  ngOnInit() {
    if(this.selectedGenePanel){
      this.setGenePanelValue(this.selectedGenePanel);
    }

    this.subscriptions.push(this.searchBarService.geneList.subscribe(genes => {
      this.geneList = genes;
    }));



    if(this.genomicsEnglandService.panels){
      this.options = this.genomicsEnglandService.panels;
    }else{
      this.subscriptions.push(this.genomicsEnglandService.getPanels('https://panelapp.genomicsengland.co.uk/api/v1/panels/', null)
      .subscribe(e => {
        this.loading = false;
        this.genomicsEnglandService.panels = e;
        this.options = e;
      }))
    }
  }

  ngAfterViewInit() {

  }

  onChange(event) {
    this.setGenePanelValue(event.value);
    this.searchBarService.panel = event.value;
  }

  setGenePanelValue(value) {
    if(value){
      this.geneList = 'Loading...'
      this.searchBarService.panel = value;
      this.subscriptions.push(this.genomicsEnglandService.getPanel(value).subscribe((data) => {
        this.geneList = data.genes.map(e => e.gene_data.gene_symbol).join();
        if(this.geneList !== undefined){
          this.searchBarService.setGeneList(this.geneList);
        }else{
          this.searchBarService.setGeneList('');
        }
      }))
    }else{
      this.geneList = value;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
