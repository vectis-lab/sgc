import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-neuromuscular-information',
    templateUrl: './neuromuscular-information.component.html',
    styleUrls: ['./neuromuscular-information.component.css'],
    providers: [ClinapiService]
})
export class NeuromuscularInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    permission: string = 'neuromuscular/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Age of onset', 'ageOfOnset', 'row'),
        new ClinicalFields('Evolution of symptoms', 'evolutionOfSymptoms', 'row'),
        new ClinicalFields('Muscle weakness', 'muscleWeakness', 'row', false),
        new ClinicalFields('Facial', 'facial', 'pie', false),
        new ClinicalFields('Ptosis', 'ptosis', 'pie', false),
        new ClinicalFields('Proximal UL', 'proximalUl', 'pie', false),
        new ClinicalFields('Prox. LL weakness', 'proxLlWeakness', 'row', false),
        new ClinicalFields('Distal LL weakness', 'distalLlWeakness', 'row', false),
        new ClinicalFields('Left bicep', 'leftBicep', 'row', false),
        new ClinicalFields('Right bicep', 'rightBicep', 'row', false),
        new ClinicalFields('Scoliosis', 'scoliosis', 'row', false),
    ];
    phenoService: string = 'getNeuromuscular'

    constructor() {
    }

}
