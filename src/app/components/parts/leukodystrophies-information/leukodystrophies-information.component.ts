import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-leukodystrophies-information',
    templateUrl: './leukodystrophies-information.component.html',
    styleUrls: ['./leukodystrophies-information.component.css']
})
export class LeukodystrophiesInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'leukodystrophies/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Data Access Group', 'dataAccessGroup', 'pie'),
        new ClinicalFields('Epilepsy', 'epilepsy', 'pie'),
        new ClinicalFields('Delivery', 'delivery', 'pie'),
        new ClinicalFields('Length', 'length', 'row'),
        new ClinicalFields('Weight', 'weight', 'row'),
        new ClinicalFields('Head circumference', 'headCircumference', 'row', false),
        new ClinicalFields('Age at presentation (months)', 'ageAtPresentationInMonths', 'row', false),
        new ClinicalFields('Developmental delay', 'developmentalDelay', 'row', false),
    ];
    phenoService: string = 'getLeukodystrophies'

    constructor() {
    }

}
