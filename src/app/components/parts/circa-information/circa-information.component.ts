import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-circa-information',
    templateUrl: './circa-information.component.html',
    styleUrls: ['./circa-information.component.css']
})
export class CircaInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('sex', 'sex', 'pie'),
        new ClinicalFields('Referrer Name', 'referrerName', 'row'),
        new ClinicalFields('Funding', 'funding', 'pie'),
        new ClinicalFields('name', 'patientName', 'row'),
        new ClinicalFields('birthyear', 'birthyear', 'row'),
        new ClinicalFields('Test Outcome', 'testOutcome', 'row'),
        new ClinicalFields('affected', 'affected', 'pie'),
    ];
    phenoService: string = 'getCirca'

    constructor() {
    }

}
