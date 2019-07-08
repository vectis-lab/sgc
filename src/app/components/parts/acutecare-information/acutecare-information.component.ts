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
        new ClinicalFields('sex', 'sex', 'pie'),
        new ClinicalFields('Participant Ethnicity', 'Ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'row'),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'row'),
        new ClinicalFields('Is mother affected?', 'motherAffected', 'pie', false),
        new ClinicalFields('Is father affected?', 'fatherAffected', 'pie', false),
        new ClinicalFields('Consanguinity', 'consanguinity', 'pie', true),
        new ClinicalFields('Number of variants reported', 'numberOfVariantsReported', 'row', false),
        new ClinicalFields('Variant 1 type', 'variant1Type', 'row', false),
        new ClinicalFields('Variant 1: Zygosity', 'variant1Zygosity', 'pie', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'row', false),
        new ClinicalFields('Variant 2 type', 'variant2Type', 'row', false),
        new ClinicalFields('Variant 2: Zygosity', 'variant2Zygosity', 'pie', false),
        new ClinicalFields('Variant 2 class', 'variant2Class', 'row', false),
        new ClinicalFields('Variant 3 type', 'variant3Type', 'row', false),
        new ClinicalFields('Variant 3: Zygosity', 'variant3Zygosity', 'pie', false),
        new ClinicalFields('Variant 3 class', 'variant3Class', 'row', false),
        new ClinicalFields('ac_preg_info_hpo1', 'ac_preg_info_hpo1', 'row', false),
        new ClinicalFields('ac_preg_info_hpo2', 'ac_preg_info_hpo2', 'row', false),
        new ClinicalFields('ac_preg_info_hpo3', 'ac_preg_info_hpo3', 'row', false),
        new ClinicalFields('ac_pheno_hpo1', 'ac_pheno_hpo1', 'row', false),
        new ClinicalFields('ac_pheno_hpo2', 'ac_pheno_hpo2', 'row', false),
        new ClinicalFields('ac_pheno_hpo3', 'ac_pheno_hpo3', 'row', false),
        new ClinicalFields('ac_pheno_hpo4', 'ac_pheno_hpo4', 'row', false),
        new ClinicalFields('ac_pheno_hpo5', 'ac_pheno_hpo5', 'row', false),
        new ClinicalFields('ac_pheno_hpo6', 'ac_pheno_hpo6', 'row', false),
        new ClinicalFields('ac_pheno_hpo7', 'ac_pheno_hpo7', 'row', false),
        new ClinicalFields('ac_pheno_hpo8', 'ac_pheno_hpo8', 'row', false),
        new ClinicalFields('ac_pheno_hpo9', 'ac_pheno_hpo9', 'row', false),
        new ClinicalFields('ac_pheno_hpo10', 'ac_pheno_hpo10', 'row', false),
        new ClinicalFields('ac_pheno_hpo11', 'ac_pheno_hpo11', 'row', false),
    ];
    phenoService: string = 'getAcutecare'

    constructor() {
    }

}
