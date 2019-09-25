import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-demo-information',
    templateUrl: './demo-information.component.html',
    styleUrls: ['./demo-information.component.css']
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
        new ClinicalFields('Low Coverage Platform', 'lowCoveragePlatform', 'pie', false),
        new ClinicalFields('Low Coverage Aligned Non Duplicated Coverage', 'lowCoverageAlignedNonDuplicatedCoverage', 'bar', true, false, null, 340, 200, 0, 17),
    ];
    phenoService: string = 'getDemo'

    constructor() {
    }

}