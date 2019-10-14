import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { genePanelsFull } from '../../../shared/genePanelList';
import { SearchBarService } from '../../../services/search-bar-service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gene-panels-fixed',
  templateUrl: './gene-panels-fixed.component.html',
  styleUrls: ['./gene-panels-fixed.component.css']
})
export class GenePanelsFixedComponent implements OnInit, OnDestroy {
  options: any = Object.keys(genePanelsFull);
  @Input() selectedGenePanel: string;
  geneList: string;
  private subscriptions: Subscription[] = [];

  constructor(public searchBarService: SearchBarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.selectedGenePanel){
      this.setGenePanelValue(this.selectedGenePanel);
    }

    this.subscriptions.push(this.searchBarService.geneList.subscribe(genes => {
      this.geneList = genes;
    }));
  }

  onChange(event) {
    this.setGenePanelValue(event.value);
    this.searchBarService.panel = event.value;
  }

  setGenePanelValue(value) {
    if(genePanelsFull[value]){
      this.geneList = genePanelsFull[value].map(panel => panel.sym);
    }else{
      this.geneList = '';
    }

    this.searchBarService.setGeneList(this.geneList);
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
