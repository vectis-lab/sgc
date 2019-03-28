import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';



@Component({
    selector: 'app-privacy-footer',
    templateUrl: './privacy-footer.component.html',
    styleUrls: ['./privacy-footer.component.css']
})
export class PrivacyFooterComponent implements OnInit {
    year = '2019';
    subscriptions: Subscription[] = [];
    selectedCohort = '';


    constructor(private router: Router, private searchBarService: SearchBarService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.searchBarService.cohort.subscribe(cohort =>{
            if(cohort === "Mitochondria"){
                this.selectedCohort = 'mitochondria';
            }else if(cohort === "Neuromuscular"){
                this.selectedCohort = 'neuromuscular';
            }else{
                this.selectedCohort = '';
            }
        }))
    }
    
    goToCohortAuthor(){
        if(this.selectedCohort === ''){
            this.router.navigate(['/authors']);
        }else{
            console.log(this.selectedCohort);
            this.router.navigate(['/authors'], {fragment: this.selectedCohort})
        }
    }
}

