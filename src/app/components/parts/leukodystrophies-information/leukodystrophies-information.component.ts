import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-leukodystrophies-information',
    templateUrl: './leukodystrophies-information.component.html',
    styleUrls: ['./leukodystrophies-information.component.css']
})
export class LeukodystrophiesInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'leukodystrophies/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Sex', 'sex', 'pie'),
        new ClinicalFields('Participant Ethnicity', 'ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'row', false),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'row', false),
        new ClinicalFields('Is mother affected?', 'isMotherAffected', 'pie', false),
        new ClinicalFields('Is father affected?', 'isFatherAffected', 'pie', false),
        new ClinicalFields('Seizures', 'seizures', 'pie'),
        new ClinicalFields('Pregnancy', 'pregnancy', 'pie'),
        new ClinicalFields('Labour', 'labour', 'pie', false),
        new ClinicalFields('Consanguinity', 'consanguinity', 'pie'),
        new ClinicalFields('Age of onset of presenting symptoms', 'ageOfOnsetOfPresentingSymptoms', 'row', false),
        new ClinicalFields('Evolution of symptoms', 'evolutionOfSymptoms', 'pie', false),
        new ClinicalFields('Foetal movements', 'foetalMovements', 'pie', false),
        new ClinicalFields('Foetal dysmorphology', 'foetalDysmorphology', 'pie', false),
        new ClinicalFields('Variant 1 type', 'variant1Type', 'row', false),
        new ClinicalFields('Variant 1: Zygosity', 'variant1Zygosity', 'row', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'row', false),
        new ClinicalFields('Variant 2 type', 'variant1Type', 'row', false),
        new ClinicalFields('Variant 2: Zygosity', 'variant1Zygosity', 'row', false),
        new ClinicalFields('Variant 2 class', 'variant1Class', 'row', false),
    ];
    phenoService: string = 'getLeukodystrophies'

    constructor() {
    }

}
