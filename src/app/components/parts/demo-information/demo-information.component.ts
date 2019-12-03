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
        new ClinicalFields('familyData', 'familyData', 'Family Data', 'pie'),
        new ClinicalFields('gender', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Population', 'population', 'Population', 'row'),
        new ClinicalFields('Relationship', 'relationship', 'Relationship', 'row'),
        new ClinicalFields('Low Coverage Center', 'lowCoverageCenter', 'Low Coverage Center', 'row'),
        new ClinicalFields('Low Coverage Platform', 'lowCoveragePlatform', 'Low Coverage Platform', 'pie', false),
        new ClinicalFields('Low Coverage Aligned Non Duplicated Coverage', 'lowCoverageAlignedNonDuplicatedCoverage', 'Low Coverage Aligned non Duplicated Coverage', 'bar', true, false, null, 340, 200, 0, 17),
    ];
    phenoService: string = 'getDemo'

    constructor() {
    }

}
