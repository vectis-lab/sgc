import { Component, OnInit } from '@angular/core';
import { MITOCHONDRIAL_DISORDERS, MITOCHONDRIAL_LIVER_DISEASE } from '../../../shared/genePanels';
import { SearchBarService } from '../../../services/search-bar-service';

@Component({
  selector: 'app-gene-panels',
  templateUrl: './gene-panels.component.html',
  styleUrls: ['./gene-panels.component.css']
})
export class GenePanelsComponent implements OnInit {
  options: object[] = [{
    label: 'Mitochondrial disorders', value: "MITOCHONDRIAL_DISORDERS"},
    {label: 'Mitochondrial liver disease', value: "MITOCHONDRIAL_LIVER_DISEASE"}
  ];
  private genesValue: string;

  constructor(public searchBarService: SearchBarService) { }

  ngOnInit() {
  }

  onChange(event) {
    if(event.value === "MITOCHONDRIAL_DISORDERS"){
      this.genesValue = MITOCHONDRIAL_DISORDERS.join();
      this.searchBarService.setGenePanels(this.genesValue);
    }else if(event.value === "MITOCHONDRIAL_LIVER_DISEASE"){
      this.genesValue = MITOCHONDRIAL_LIVER_DISEASE.join();
      this.searchBarService.setGenePanels(this.genesValue);
    }else{
      this.genesValue = "";
      this.searchBarService.setGenePanels('');
    }
    
  }

}
