import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-mgrb-information',
    templateUrl: './mgrb-information.component.html',
    styleUrls: ['./mgrb-information.component.css']
})
export class MgrbInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('cohort', 'cohort', 'Cohort', 'pie', false),
        new ClinicalFields('inMGRBphase2', 'inMGRBPhase2', 'In MGRB Phase 2', 'pie', false),
        new ClinicalFields('AgeAtCollectionYears', 'ageAtCollection', 'Age at Collection', 'bar', true, false, null, 340, 200, 60, 100),
        new ClinicalFields('YearOfCollection', 'yearOfCollection', 'Year of Collection', 'bar', true, false, null, 340, 200, 2009, 2016),
        new ClinicalFields('HtMtrs', 'heightInMetre', 'Height, cm', 'bar', true, false, null, 340, 200, 130, 200),
        new ClinicalFields('WtKgs', 'weight', 'Weight, kg', 'bar', true, false, null, 340, 200, 30, 120),
        new ClinicalFields('AbdoCircCms', 'abdomenCircumference', 'Abdomen Circumference', 'bar', false, false, null, 340, 200, 50, 150),
        new ClinicalFields('GlcmmolL', 'glucoseMmolPerL', 'Glucose, mmol/L', 'bar', true, false, null, 340, 200, 1, 10),
        new ClinicalFields('AMD', 'AMD', 'Age-related Macular Degeneration', 'pie', false),
        new ClinicalFields('treatedForHighBP', 'treatedForHighBP', 'Treated for High Blood Pressure', 'pie', false),
        new ClinicalFields('treatedForHighChol', 'treatedForHighChol', 'Treated for High Cholesterol', 'pie', false),
        new ClinicalFields('Cancer.AnyCancer', 'cancer', 'Cancer', 'pie'),
        new ClinicalFields('Cancer.AgeWithoutCancerYears', 'ageWithoutCancer', 'Age without Cancer','bar', true, false, null, 340, 200, 65, 100),
    ];
    phenoService: string = 'getMgrb'

    constructor() {
    }

}
