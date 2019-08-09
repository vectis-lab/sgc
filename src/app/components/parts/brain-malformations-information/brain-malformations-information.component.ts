import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
  selector: 'app-brain-malformations-information',
  templateUrl: './brain-malformations-information.component.html',
  styleUrls: ['./brain-malformations-information.component.css'],
  providers: [ClinapiService]
})
export class BrainMalformationsInformationComponent {
  //Internal IDs
  @Input() samples: string[] = [];
  //pheno file
  @Input() pheno: any[] = [];
  permission: string = 'bm/pheno'
  clinicalFields: ClinicalFields[] = [
      new ClinicalFields('Data Access Group', 'dataAccessGroup', 'pie'),
      new ClinicalFields('Pregnancy', 'pregnancy', 'pie'),
      new ClinicalFields('Delivery', 'delivery', 'pie'),
      new ClinicalFields('Length', 'length', 'row'),
      new ClinicalFields('Weight', 'weight', 'row'),
      new ClinicalFields('Head circumference', 'headCircumference', 'row', false),
      new ClinicalFields('Age at presentation (months)', 'ageAtPresentationInMonths', 'row', false),
      new ClinicalFields('Developmental delay', 'developmentalDelay', 'row', false),
  ];
  phenoService: string = 'getBrainMalformations'

  constructor() {
  }

}