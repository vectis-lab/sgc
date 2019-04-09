import { Component, OnInit } from '@angular/core';
import { MITOCHONDRIAL_DISORDERS } from '../../../shared/genePanels';
import { SearchBarService } from '../../../services/search-bar-service';

@Component({
  selector: 'app-gene-panels',
  templateUrl: './gene-panels.component.html',
  styleUrls: ['./gene-panels.component.css']
})
export class GenePanelsComponent implements OnInit {
  options: object[] = [{label: 'Mitochondrial Disorders', value: "MITOCHONDRIAL_DISORDERS"}];
  private genesValue: string;

  constructor(public searchBarService: SearchBarService) { }

  ngOnInit() {
  }

  onChange(event) {
    if(event.value === "MITOCHONDRIAL_DISORDERS"){
      this.genesValue = MITOCHONDRIAL_DISORDERS.join();
      this.searchBarService.setGenePanels(this.genesValue);
    }else{
      this.genesValue = "";
      this.searchBarService.setGenePanels('');
    }
    
  }

}
