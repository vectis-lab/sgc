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
        new ClinicalFields('sex', 'sex', 'pie'),
        new ClinicalFields('Participant Ethnicity', 'ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'row', false),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'row', false),
        new ClinicalFields('Is mother affected?', 'isMotherAffected', 'pie', false),
        new ClinicalFields('Is father affected?', 'isFatherAffected', 'pie', false),
        new ClinicalFields('Age at diagnosis', 'ageAtDiagnosis', 'row', false),
        new ClinicalFields('Final diagnosis', 'finalDiagnosis', 'row', false),
        new ClinicalFields('Chest film', 'chestFilm', 'row', false),
        new ClinicalFields('Symptoms at onset', 'symptomsAtOnset', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Physical examination', 'physicalExamination', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Number of variants reported', 'numberOfVariantsReported', 'row', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'row', false),
        new ClinicalFields('Variant 2 class', 'variant2Class', 'row', false),
        new ClinicalFields('Variant 3 class', 'variant3Class', 'row', false),
        new ClinicalFields('Variant 4 class', 'variant4Class', 'row', false),
        new ClinicalFields('Variant 5 class', 'variant5Class', 'row', false),
    ];
    phenoService: string = 'getChildranz'

    constructor() {
    }

}
