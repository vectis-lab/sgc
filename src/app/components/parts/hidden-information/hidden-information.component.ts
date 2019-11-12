import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-hidden-information',
    templateUrl: './hidden-information.component.html',
    styleUrls: ['./hidden-information.component.css']
})
export class HiddenInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'hidden/pheno'

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
        new ClinicalFields('Serology features', 'serologyFeatures', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Urinalysis findings', 'urinalysisFindings', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Imaging findings', 'imagingFindings', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Biopsy findings', 'biopsyFindings', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Other general or non specifics renal features', 'otherNonSpevificsRenalFeatures', 'row',true, true, this.multiValueFilter),
        new ClinicalFields('Current RRT', 'currentRRT', 'row', false, true, this.multiValueFilter),
        new ClinicalFields('Previous RRT', 'previousRRT', 'row', false, true, this.multiValueFilter),
        new ClinicalFields('Are there any non renal phenotypic features ?', 'anyNonRenalPhenotypicFeatures', 'pie'),
        new ClinicalFields('Non renal phenotypic features', 'nonRenalPheotypicFeatures', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Developmental/Learning/Behavioural issues', 'developmentalIssues', 'row', false),
        new ClinicalFields('Dysmorphology', 'dysmorphology', 'pie', false),
        new ClinicalFields('Are there any other non renal features?', 'anyOtherNonRenalFeatures', 'pie', false),
        new ClinicalFields('Growth parameters', 'growthParameters', 'row', false),
        new ClinicalFields('Age at which CKD first diagnosed', 'ageAtWhichCKDFirstDiagnosed', 'row', false),
        new ClinicalFields('Age when first saw renal physician/nephrologist', 'ageWhenFirstSawRenalPhysician', 'row', false),
        new ClinicalFields('Stage of CKD when first diagnosed', 'stageOfCKD', 'row', false),
        new ClinicalFields('Number of genes reported', 'genesReported', 'pie', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'pie', false),

    ];
    phenoService: string = 'getHidden'

    constructor() {
    }

}
