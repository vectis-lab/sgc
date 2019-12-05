import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-kidgen-information',
    templateUrl: './kidgen-information.component.html',
    styleUrls: ['./kidgen-information.component.css']
})
export class KidgenInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'kidgen/pheno'

    multiValueFilter = (dimension, filters) => {
      dimension.filter(null);   
      if (filters.length === 0)
          dimension.filter(null);
      else
          dimension.filterFunction(function (d) {
              if (_.difference(filters, d).length === 0) return true;
              return false; 
          });
      return filters;  
  }

    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('i. Urea (mmol per L)', 'ureaMmolPerL', 'Urea (mmol/L)','bar', true, false, null, 340, 200, 0, 30),
        new ClinicalFields('ii. Creatinine (umol per L)', 'creatinineUmolPerL', 'Creatinine (umol/L)', 'bar', true, false, null, 340, 200, 0, 200),
        new ClinicalFields('iii. eGFR (mL per min per 1.73m_)', 'eGFRMlPerMin', 'eGFR (mL/min/1.73m)', 'bar', true, false, null, 340, 200, 0, 200),
        new ClinicalFields('iv. CKD stage', 'CKDStage', 'CKD stage', 'row'),
        new ClinicalFields('B. Hypertension Enter results if available', 'hypertension', 'Hypertension', 'pie'),
        new ClinicalFields('Value Sodium', 'sodium', 'Value Sodium', 'bar', false, false, null, 340, 200, 120, 160),
        new ClinicalFields('Value Potassium', 'potassium', 'Value Potassium', 'bar', false, false, null, 340, 200, 0, 10),
        new ClinicalFields('Value Chloride', 'chloride', 'Value Chloride', 'bar', false, false, null, 340, 200, 90, 200),
        new ClinicalFields('Value Bicarbonate', 'bicarbonate', 'Value Bicarbonate', 'bar', false, false, null, 340, 200, 15, 35),
        new ClinicalFields('Value Calcium', 'calcium', 'Value Calcium', 'bar', false, false, null, 340, 200, 0, 5),
        new ClinicalFields('Value Magnesium', 'magnesium', 'Value Magnesium', 'bar', false, false, null, 340, 200, 0, 5),
        new ClinicalFields('Value Phosphate', 'phosphate', 'Value Phosphate', 'bar', false, false, null, 340, 200, 0, 5),
        new ClinicalFields('Value Bilirubin', 'bilirubin', 'Value Bilirubin', 'bar', false, false, null, 340, 200, 0, 15),
        new ClinicalFields('Value ALP', 'alp', 'Value ALP', 'bar', false, false, null, 340, 200, 0, 10),
        new ClinicalFields('Value GGT', 'ggt', 'Value GGT', 'bar', false, false, null, 340, 200, 0, 70),
        new ClinicalFields('Value ALT', 'alt', 'Value ALT', 'bar', false, false, null, 340, 200, 0, 80),
        new ClinicalFields('Value AST', 'ast', 'Value AST', 'bar', false, false, null, 340, 200, 0, 40),
        new ClinicalFields('Value Albumin', 'albumin', 'Value Albumin', 'bar', false, false, null, 340, 200, 0, 50),
        new ClinicalFields('i. Haematuria', 'haematuria', 'i. Haematuria', 'pie'),
        new ClinicalFields('ii. Proteinuria', 'proteinuria', 'ii. Proteinuria', 'pie'),
        new ClinicalFields('Protein: Creatinine ratio value', 'protein', 'Protein: Creatinine ratio value', 'bar', false, false, null, 340, 200, 0, 1500),
    ];
    phenoService: string = 'getKidgen'

    constructor() {
    }

}
