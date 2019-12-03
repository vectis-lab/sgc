import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-childranz-information',
    templateUrl: './childranz-information.component.html',
    styleUrls: ['./childranz-information.component.css']
})
export class ChildranzInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'childranz/pheno';

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
        new ClinicalFields('Participant Ethnicity', 'ethnicity', 'Participant Ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'Maternal Ethnicity', 'row', false),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'Paternal Ethnicity', 'row', false),
        new ClinicalFields('Is mother affected?', 'isMotherAffected', 'Is mother affected?', 'pie', false),
        new ClinicalFields('Is father affected?', 'isFatherAffected', 'Is father affected?', 'pie', false),
        new ClinicalFields('Age at diagnosis', 'ageAtDiagnosis', 'Age at Diagnosis', 'row', false),
        new ClinicalFields('Final diagnosis', 'finalDiagnosis', 'Final Diagnosis', 'row', false),
        new ClinicalFields('Chest film', 'chestFilm', 'Chest Film', 'row', false),
        new ClinicalFields('Symptoms at onset', 'symptomsAtOnset', 'Symptoms at Onset', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Physical examination', 'physicalExamination', 'Physical Examination', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Number of variants reported', 'numberOfVariantsReported', 'Number of Variants Reported', 'row', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'Variant 1 Class', 'row', false),
        new ClinicalFields('Variant 2 class', 'variant2Class', 'Variant 2 Class', 'row', false),
        new ClinicalFields('Variant 3 class', 'variant3Class', 'Variant 3 Class', 'row', false),
        new ClinicalFields('Variant 4 class', 'variant4Class', 'Variant 4 Class', 'row', false),
        new ClinicalFields('Variant 5 class', 'variant5Class', 'Variant 5 Class', 'row', false),
    ];
    phenoService: string = 'getChildranz'

    constructor() {
    }

}
