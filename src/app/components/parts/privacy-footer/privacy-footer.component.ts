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
    selectedCohort = this.searchBarService.options[0].getValue().toLowerCase();
    hover=false;

    constructor(private router: Router, private searchBarService: SearchBarService) {
    }

    ngOnInit() {

    }
    
    goToCohortAuthor(){
        if(this.selectedCohort === '' || (!this.router.url.includes('/search/results') && !this.router.url.includes('/clinical/results'))){
            this.router.navigate(['/authors']);
        }else{
            this.router.navigate(['/authors'], {fragment: this.selectedCohort})
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {subscription.unsubscribe()})
    }
}

