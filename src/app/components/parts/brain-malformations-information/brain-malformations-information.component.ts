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
      new ClinicalFields('Sex', 'sex', 'Sex', 'pie'),
      new ClinicalFields('Participant Ethnicity', 'ethnicity', 'Participant Ethnicity', 'row'),
      new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'Maternal Ethnicity', 'row', false),
      new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'Paternal Ethnicity', 'row', false),
      new ClinicalFields('Is mother affected?', 'isMotherAffected', 'Is mother affected?', 'pie', false),
      new ClinicalFields('Is father affected?', 'isFatherAffected', 'Is father affected?', 'pie', false),
      new ClinicalFields('Pregnancy', 'pregnancy', 'Pregnancy', 'pie', false),
      new ClinicalFields('Delivery', 'delivery', 'Delivery', 'pie', false),
      new ClinicalFields('Developmental delay', 'developmentalDelay', 'Developmental delay', 'row', false),
      new ClinicalFields('Seizure types', 'seizureTypes', 'Seizure types', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Cerebellum choice', 'cerebellumChoice', 'Cerebellum choice', 'row', false, true, this.multiValueFilter),
      new ClinicalFields('Conditions', 'conditions', 'Conditions', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Abnormalities', 'abnormalities', 'Abnormalities', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Variant 1 type', 'variant1Type', 'Variant 1 type', 'row', false),
      new ClinicalFields('Variant 1: Zygosity', 'variant1Zygosity', 'Variant 1: Zygosity', 'row', false),
      new ClinicalFields('Variant 1 class', 'variant1Class', 'Variant 1 class', 'row', false),
  ];
  phenoService: string = 'getBrainMalformations'

  constructor() {
  }

}