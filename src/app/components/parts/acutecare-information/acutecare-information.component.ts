import { Component, Input } from '@angular/core';
import { ClinapiService } from '../../../services/clinapi.service';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-acutecare-information',
    templateUrl: './acutecare-information.component.html',
    styleUrls: ['./acutecare-information.component.css'],
    providers: [ClinapiService]
})
export class AcutecareInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
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
        new ClinicalFields('Variant type', 'variantType', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('Variant Zygosity', 'variantZygosity', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('Variant class', 'variantClass', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('ac_preg_info_hpo', 'ac_preg_info_hpo', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('ac_pheno_hpo', 'ac_pheno_hpo', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
    ];
    phenoService: string = 'getAcutecare'

    constructor() {
    }

}
