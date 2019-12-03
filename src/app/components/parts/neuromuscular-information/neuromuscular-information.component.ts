import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-neuromuscular-information',
    templateUrl: './neuromuscular-information.component.html',
    styleUrls: ['./neuromuscular-information.component.css']
})
export class NeuromuscularInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'neuromuscular/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Age of onset', 'ageOfOnset', 'Age of Onset', 'row'),
        new ClinicalFields('Evolution of symptoms', 'evolutionOfSymptoms', 'Evolution of Symptoms', 'row'),
        new ClinicalFields('Muscle weakness', 'muscleWeakness', 'Muscle Weakeness', 'row', false),
        new ClinicalFields('Facial', 'facial', 'Facial', 'pie', false),
        new ClinicalFields('Ptosis', 'ptosis', 'Ptosis', 'pie', false),
        new ClinicalFields('Proximal UL', 'proximalUl', 'Proximal UL', 'pie', false),
        new ClinicalFields('Prox. LL weakness', 'proxLlWeakness', 'Prox. LL weakness', 'row', false),
        new ClinicalFields('Distal LL weakness', 'distalLlWeakness', 'Distal LL weakness', 'row', false),
        new ClinicalFields('Left bicep', 'leftBicep', 'Left Bicep', 'row', false),
        new ClinicalFields('Right bicep', 'rightBicep', 'Right Bicep', 'row', false),
        new ClinicalFields('Scoliosis', 'scoliosis', 'Scoliosis', 'row', false),
    ];
    phenoService: string = 'getNeuromuscular'

    constructor() {
    }

}
