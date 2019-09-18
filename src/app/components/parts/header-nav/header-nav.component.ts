import { Component, OnInit, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
    subscriptions: Subscription[] = [];
    termsDropdown = false;
    userDropdown = false;
    termsLinkActive = false;
    userEmail = localStorage.getItem('uid')?localStorage.getItem('uid'):null;
    userPicture;
    cohort = this.searchBarService.options[0].getValue();

    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.hideTerms();
            this.hideUser();
        }
    }

    constructor(public auth: Auth,
                private router: Router,
                private route: ActivatedRoute,
                private elf: ElementRef,
                private scrollService: ScrollService,
                public dialog: MatDialog,
                private searchBarService: SearchBarService,
                public cd: ChangeDetectorRef) {    

    }
    

    ngOnInit() {
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            });

        this.scrollService.scrolled.subscribe(this.hideTerms);

        this.auth.getUser().subscribe(user => {
            if(user){
                this.userPicture = user.picture;
                this.cd.detectChanges();
            }
        })

        this.subscriptions.push(this.searchBarService.selectedCohort.subscribe(cohort => {
            this.cohort = cohort;
        }))

    }

    toggleTerms(event: Event) {
        event.stopPropagation();
        this.termsDropdown ? this.hideTerms() : this.showTerms();
    }

    hideTerms = () => {
        if (this.termsDropdown) {
            this.termsDropdown = false;
        }
    };

    showTerms = () => {
        if (!this.termsDropdown) {
            this.termsDropdown = true;
            this.userDropdown = false;
        }
    };

    toggleUser(event: Event) {
        event.stopPropagation();
        this.userDropdown ? this.hideUser() : this.showUser();
    }

    hideUser = () => {
        if (this.userDropdown) {
            this.userDropdown = false;
        }
    };

    showUser = () => {
        if (!this.userDropdown) {
            this.userDropdown = true;
            this.termsDropdown = false;
        }
    };

    openSignUpDialog() {
        this.dialog.open(
            SignUpComponent,
            {}
        );
    }

}
