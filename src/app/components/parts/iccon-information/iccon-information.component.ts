import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-iccon-information',
    templateUrl: './iccon-information.component.html',
    styleUrls: ['./iccon-information.component.css'],
    providers: [ClinapiService]
})
export class IcconInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    permission: string = 'iccon/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Sex', 'sex', 'pie'),
        new ClinicalFields('YOB', 'yearOfBirth', 'row'),
        new ClinicalFields('Index case?', 'indexCase', 'row'),
        new ClinicalFields('Case', 'case', 'row', true, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        },
        325,
        200),
    ];
    phenoService: string = 'getIccon'

    constructor() {
    }

}
