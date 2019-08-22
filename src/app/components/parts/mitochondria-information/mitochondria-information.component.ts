import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-mitochondria-information',
    templateUrl: './mitochondria-information.component.html',
    styleUrls: ['./mitochondria-information.component.css'],
    providers: [ClinapiService]
})
export class MitochondriaInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    permission: string = 'mito/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Gender', 'gender', 'pie'),
        new ClinicalFields('Condition', 'conditions', 'row', true, true, (dimension, filters) => {
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
        200,
    ),
    ];
    phenoService: string = 'getMitochondria'

    constructor() {
    }

}

