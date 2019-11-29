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
        new ClinicalFields('sex', 'sex', 'pie'),
        new ClinicalFields('cohort', 'cohort', 'pie', false),
        new ClinicalFields('inMGRBphase2', 'inMGRBPhase2', 'pie', false),
        new ClinicalFields('YearOfBirth', 'yearOfBirth', 'bar', true, false, null, 340, 200, 1910, 1950),
        new ClinicalFields('YearOfCollection', 'yearOfCollection', 'bar', true, false, null, 340, 200, 2009, 2016),
        new ClinicalFields('HtMtrs', 'heightInMetre', 'bar', true, false, null, 340, 200, 1.3, 3),
        new ClinicalFields('WtKgs', 'weight', 'bar', true, false, null, 340, 200, 30, 120),
        new ClinicalFields('AbdoCircCms', 'abdomenCircumference', 'bar', false, false, null, 340, 200, 50, 150),
        new ClinicalFields('GlcmmolL', 'glucoseMmolPerL', 'bar', true, false, null, 340, 200, 1, 10),
        new ClinicalFields('AMD', 'AMD', 'pie', false),
        new ClinicalFields('treatedForHighBP', 'treatedForHighBP', 'pie', false),
        new ClinicalFields('treatedForHighChol', 'treatedForHighChol', 'pie', false),
        new ClinicalFields('Cancer.AnyCancer', 'cancer', 'pie'),
        new ClinicalFields('Cancer.AgeWithoutCancerYears', 'ageWithoutCancer', 'bar', true, false, null, 340, 200, 65, 100),
    ];
    phenoService: string = 'getMgrb'

    constructor() {
    }

}
