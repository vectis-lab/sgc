import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-genetic-immunology-information',
    templateUrl: './genetic-immunology-information.component.html',
    styleUrls: ['./genetic-immunology-information.component.css']
})
export class GeneticImmunologyInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'gi/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('diagnosis', 'diagnosis', 'Diagnosis', 'row'),

    ];
    phenoService: string = 'getGeneticImmunology'

    constructor() {
    }

}
