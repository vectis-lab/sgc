import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';



@Component({
    selector: 'app-privacy-footer',
    templateUrl: './privacy-footer.component.html',
    styleUrls: ['./privacy-footer.component.css']
})
export class PrivacyFooterComponent implements OnInit, OnDestroy {
    year = '2019';
    subscriptions: Subscription[] = [];
    selectedCohort = this.searchBarService.options[0].getValue();
    hover=false;

    mappingAuthors ={
        'Acutecare': '/rare-disease-flagships/#program-2184',
        'Mitochondria': '/rare-disease-flagships/#program-1317',
        'Neuromuscular': '/rare-disease-flagships/#program-1316',
        'Epileptic Encephalopathies': '/rare-disease-flagships/#program-1318',
        'Brain Malformations': '/rare-disease-flagships/#program-1318',
        'Leukodystrophies': '/rare-disease-flagships/#program-1318',
        'ICCon': '/cancer-flagships/#program-2059'
    }

    constructor(private router: Router, private searchBarService: SearchBarService) {
    }

    ngOnInit() {
        this.searchBarService.selectedCohort.subscribe(cohort => {
            this.selectedCohort = cohort;
        })
    }
    
    goToCohortAuthor(){
        if(this.selectedCohort === '' || this.selectedCohort === 'Demo'){
            window.open('https://www.australiangenomics.org.au/our-research/disease-flagships/rare-disease-flagships/','_blank')
        }else{
            window.open(`https://www.australiangenomics.org.au/our-research/disease-flagships${this.mappingAuthors[this.selectedCohort]}`, 'blank')
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {subscription.unsubscribe()})
    }
}

