import { Component, OnInit, OnDestroy } from '@angular/core';
import { MITOCHONDRIAL_DISORDERS, MITOCHONDRIAL_LIVER_DISEASE } from '../../../shared/genePanels';
import { SearchBarService } from '../../../services/search-bar-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gene-panels',
  templateUrl: './gene-panels.component.html',
  styleUrls: ['./gene-panels.component.css']
})
export class GenePanelsComponent implements OnInit, OnDestroy {
  options: object[] = [{
    label: 'Mitochondrial disorders', value: "MITOCHONDRIAL_DISORDERS"},
    {label: 'Mitochondrial liver disease', value: "MITOCHONDRIAL_LIVER_DISEASE"}
  ];
  private selectedGenePanel: string;
  private genePanelsValue: string;
  private subscriptions: Subscription[] = [];

  constructor(public searchBarService: SearchBarService) { }

  ngOnInit() {
    this.subscriptions.push(this.searchBarService.genePanels.subscribe(panel => {
      this.selectedGenePanel = panel;
      this.setGenePanelValue(panel);
    }))
  }

  onChange(event) {
    this.searchBarService.setGenePanels(event.value);
    this.setGenePanelValue(event.value);
  }

  setGenePanelValue(value) {
    if(value === 'MITOCHONDRIAL_DISORDERS'){
      this.genePanelsValue = MITOCHONDRIAL_DISORDERS.join();
    }   
    else if(value === 'MITOCHONDRIAL_LIVER_DISEASE'){
      this.genePanelsValue = MITOCHONDRIAL_LIVER_DISEASE.join();
    }
    else{
      this.genePanelsValue = '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

}
