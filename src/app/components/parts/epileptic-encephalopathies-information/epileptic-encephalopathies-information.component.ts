import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-epileptic-encephalopathies-information',
    templateUrl: './epileptic-encephalopathies-information.component.html',
    styleUrls: ['./epileptic-encephalopathies-information.component.css']
})
export class EpilepticEncephalopathiesInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'ee/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Data Access Group', 'dataAccessGroup', 'pie'),
        new ClinicalFields('Age of onset', 'ageOfOnset', 'row'),
        new ClinicalFields('Age of peak seizure frequency', 'ageOfPeakSeizureFrequency', 'row', false),
        new ClinicalFields('Ongoing seizures', 'ongoingSeizures', 'pie', false),
        new ClinicalFields('Status', 'status', 'row', false),
        new ClinicalFields('Number of seizure types', 'numberOfSeizureTypes', 'row', false),
        new ClinicalFields('Seizure type', 'seizureType', 'row', false),
        new ClinicalFields('Hemiclonic', 'hemiclonic', 'pie', false),
    ];
    phenoService: string = 'getEpilepticEncephalopathies'

    constructor() {
    }

}
