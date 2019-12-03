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
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Serology features', 'serologyFeatures', 'Serology Features', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Urinalysis findings', 'urinalysisFindings', 'Urinalysis Findings', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Imaging findings', 'imagingFindings', 'Imaging Findings', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Biopsy findings', 'biopsyFindings', 'Biopsy Findings', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Other general or non specifics renal features', 'otherNonSpevificsRenalFeatures', 'Other General or Non Specifics Renal Features', 'row',true, true, this.multiValueFilter),
        new ClinicalFields('Current RRT', 'currentRRT', 'Current RRT', 'row', false, true, this.multiValueFilter),
        new ClinicalFields('Previous RRT', 'previousRRT', 'Previous RRT', 'row', false, true, this.multiValueFilter),
        new ClinicalFields('Are there any non renal phenotypic features ?', 'anyNonRenalPhenotypicFeatures', 'Any non renal phenotypic features ?', 'pie'),
        new ClinicalFields('Non renal phenotypic features', 'nonRenalPheotypicFeatures', 'Non renal phenotypic features', 'row', true, true, this.multiValueFilter),
        new ClinicalFields('Developmental/Learning/Behavioural issues', 'developmentalIssues', 'Developmental/Learning/Behavioural issues', 'row', false),
        new ClinicalFields('Dysmorphology', 'dysmorphology', 'Dysmorphology', 'pie', false),
        new ClinicalFields('Are there any other non renal features?', 'anyOtherNonRenalFeatures', 'Are there any other non renal features?', 'pie', false),
        new ClinicalFields('Growth parameters', 'growthParameters', 'Growth Parameters', 'row', false),
        new ClinicalFields('Age at which CKD first diagnosed', 'ageAtWhichCKDFirstDiagnosed', 'Age at Which CKD First Diagnosed', 'row', false),
        new ClinicalFields('Age when first saw renal physician/nephrologist', 'ageWhenFirstSawRenalPhysician', 'Age When First Saw Renal Physician/Nephrologist', 'row', false),
        new ClinicalFields('Stage of CKD when first diagnosed', 'stageOfCKD', 'Stage of CKD When First Diagnosed', 'row', false),
        new ClinicalFields('Number of genes reported', 'genesReported', 'Number of Genes Reported', 'pie', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'Variant 1 class', 'pie', false),

    ];
    phenoService: string = 'getHidden'

    constructor() {
    }

}
