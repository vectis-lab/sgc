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
        new ClinicalFields('Sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Participant Ethnicity', 'ethnicity', 'Participant Ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'Maternal Ethnicity', 'row', false),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'Paternal Ethnicity', 'row', false),
        new ClinicalFields('Is mother affected?', 'isMotherAffected', 'Is mother affected?', 'pie', false),
        new ClinicalFields('Is father affected?', 'isFatherAffected', 'Is father affected?', 'pie', false),
        new ClinicalFields('Seizures', 'seizures', 'Seizures', 'pie'),
        new ClinicalFields('Pregnancy', 'pregnancy', 'Pregnancy', 'pie'),
        new ClinicalFields('Labour', 'labour', 'Labour', 'pie', false),
        new ClinicalFields('Consanguinity', 'consanguinity', 'Consanguinity', 'pie'),
        new ClinicalFields('Age of onset of presenting symptoms', 'ageOfOnsetOfPresentingSymptoms', 'Age of Onset of Presenting Symptoms', 'row', false),
        new ClinicalFields('Evolution of symptoms', 'evolutionOfSymptoms', 'Evolution of Symptoms', 'pie', false),
        new ClinicalFields('Foetal movements', 'foetalMovements', 'Foetal Movements', 'pie', false),
        new ClinicalFields('Foetal dysmorphology', 'foetalDysmorphology', 'Foetal Dysmorphology', 'pie', false),
        new ClinicalFields('Variant 1 type', 'variant1Type', 'Variant 1 type', 'row', false),
        new ClinicalFields('Variant 1: Zygosity', 'variant1Zygosity', 'Variant 1: Zygosity', 'row', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'Variant 1 class', 'row', false),
        new ClinicalFields('Variant 2 type', 'variant1Type', 'Variant 2 type', 'row', false),
        new ClinicalFields('Variant 2: Zygosity', 'variant1Zygosity', 'Variant 2: Zygosity', 'row', false),
        new ClinicalFields('Variant 2 class', 'variant1Class', 'Variant 2 class', 'row', false),
    ];
    phenoService: string = 'getLeukodystrophies'

    constructor() {
    }

}
