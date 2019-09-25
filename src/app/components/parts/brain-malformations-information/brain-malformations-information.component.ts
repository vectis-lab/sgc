import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
  selector: 'app-brain-malformations-information',
  templateUrl: './brain-malformations-information.component.html',
  styleUrls: ['./brain-malformations-information.component.css']
})
export class BrainMalformationsInformationComponent {
  //Internal IDs
  @Input() samples: string[] = [];
  //pheno file
  @Input() pheno: any[] = [];
  permission: string = 'bm/pheno'

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
      new ClinicalFields('Sex', 'sex', 'pie'),
      new ClinicalFields('Participant Ethnicity', 'ethnicity', 'row'),
      new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'row', false),
      new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'row', false),
      new ClinicalFields('Is mother affected?', 'isMotherAffected', 'pie', false),
      new ClinicalFields('Is father affected?', 'isFatherAffected', 'pie', false),
      new ClinicalFields('Pregnancy', 'pregnancy', 'pie', false),
      new ClinicalFields('Delivery', 'delivery', 'pie', false),
      new ClinicalFields('Developmental delay', 'developmentalDelay', 'row', false),
      new ClinicalFields('Seizure types', 'seizureTypes', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Cerebellum choice', 'cerebellumChoice', 'row', false, true, this.multiValueFilter),
      new ClinicalFields('Conditions', 'conditions', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Abnormalities', 'abnormalities', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Variant 1 type', 'variant1Type', 'row', false),
      new ClinicalFields('Variant 1: Zygosity', 'variant1Zygosity', 'row', false),
      new ClinicalFields('Variant 1 class', 'variant1Class', 'row', false),
  ];
  phenoService: string = 'getBrainMalformations'

  constructor() {
  }

}