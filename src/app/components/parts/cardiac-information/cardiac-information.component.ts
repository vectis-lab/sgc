import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-cardiac-information',
    templateUrl: './cardiac-information.component.html',
    styleUrls: ['./cardiac-information.component.css']
})
export class CardiacInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'cardiac/pheno';

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
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'Maternal Ethnicity', 'row'),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'Paternal Ethnicity', 'row'),
        new ClinicalFields('Is participant adopted?', 'isParticipantAdopted', 'Is participant adopted?', 'pie'),
        new ClinicalFields('Number of affected first degree relatives', 'noOfAffectedFirstDegreeRelatives', 'Number of affected first degree relatives', 'row'),
        new ClinicalFields('Number of affected second degree relatives', 'noOfAffectedSecondDegreeRelatives', 'Number of affected second degree relatives', 'row'),
        new ClinicalFields('Diagnosis:', 'diagnosis', 'Diagnosis', 'row'),
    ];
    phenoService: string = 'getCardiac'

    constructor() {
    }

}
