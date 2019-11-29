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
        new ClinicalFields('sex', 'sex', 'pie'),
        new ClinicalFields('A. Renal Impairment Please include test values, even is results are normal', 'renalImpairmanet', 'row'),
        new ClinicalFields('i. Urea (mmol per L)', 'ureaMmolPerL', 'row'),
        new ClinicalFields('ii. Creatinine (umol per L)', 'creatinineUmolPerL', 'row'),
        new ClinicalFields('iii. eGFR (mL per min per 1.73m_)', 'eGFRMlPerMin', 'row'),
        new ClinicalFields('iv. CKD stage', 'CKDStage', 'pie'),
        new ClinicalFields('v. Current RRT', 'currentRRT', 'pie'),
        new ClinicalFields('B. Hypertension Enter results if available', 'hypertension', 'pie')
    ];
    phenoService: string = 'getKidgen'

    constructor() {
    }

}
