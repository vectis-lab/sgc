import { Component, OnInit } from '@angular/core';
import { MITOCHONDRIAL_DISORDERS } from '../../../shared/genePanels';

@Component({
  selector: 'app-gene-panels',
  templateUrl: './gene-panels.component.html',
  styleUrls: ['./gene-panels.component.css']
})
export class GenePanelsComponent implements OnInit {
  options: object[] = [{label: 'Mitochondrial Disorders', value: "MITOCHONDRIAL_DISORDERS"}];
  genesValue: string;

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    if(event.value === "MITOCHONDRIAL_DISORDERS"){
      this.genesValue = MITOCHONDRIAL_DISORDERS.join();
    }else{
      this.genesValue = "";
    }
    
  }

}
