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
        new ClinicalFields('sex', 'sex', 'pie'),
        new ClinicalFields('Participant Ethnicity', 'ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'row'),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'row'),
        new ClinicalFields('Is participant adopted?', 'isParticipantAdopted', 'pie'),
        new ClinicalFields('Number of affected first degree relatives', 'noOfAffectedFirstDegreeRelatives', 'row'),
        new ClinicalFields('Number of affected second degree relatives', 'noOfAffectedSecondDegreeRelatives', 'row'),
        new ClinicalFields('Diagnosis:', 'diagnosis', 'row'),
    ];
    phenoService: string = 'getCardiac'

    constructor() {
    }

}
