import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-demo-information',
    templateUrl: './demo-information.component.html',
    styleUrls: ['./demo-information.component.css'],
    providers: [ClinapiService]
})
export class DemoInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('gender', 'sex', 'pie'),
        new ClinicalFields('Population', 'population', 'row'),
        new ClinicalFields('Relationship', 'relationship', 'row'),
        new ClinicalFields('Low Coverage Center', 'lowCoverageCenter', 'row'),
        new ClinicalFields('Low Coverage Platform', 'lowCoveragePlatform', 'pie'),
    ];
    phenoService: string = 'getDemo'

    constructor() {
    }

}
