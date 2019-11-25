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
        new ClinicalFields('cohort', 'cohort', 'pie'),
    ];
    phenoService: string = 'getMgrb'

    constructor() {
    }

}
