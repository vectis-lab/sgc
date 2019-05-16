import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-acutecare-information',
    templateUrl: './acutecare-information.component.html',
    styleUrls: ['./acutecare-information.component.css'],
    providers: [ClinapiService]
})
export class AcutecareInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    permission: string = 'acutecare/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Sex of patient:', 'sex', 'pie'),
        new ClinicalFields('Maternal Ethnicity (choose one of):', 'maternalEthnicity', 'row'),
        new ClinicalFields('Paternal Ethnicity (choose one of):', 'paternalEthnicity', 'row'),
    ];
    phenoService: string = 'getAcutecare'

    constructor() {
    }

}
