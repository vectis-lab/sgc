import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Initiative } from '../../../model/initiative';
import { InitiativeService } from '../../../services/project-data/initiative-service';
import { Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { Auth } from '../../../services/auth-service';

@Component({
    selector: 'app-initiatives',
    templateUrl: './initiatives.component.html',
    styleUrls: ['./initiatives.component.css']
})
export class InitiativesComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    initiatives: Initiative[];
    shadowStyle = {
        'background-color': 'rgba(0, 0, 0, 0)',
    };

    constructor(public scrollService: ScrollService,
                private initiativeService: InitiativeService,
                private router: Router,
                private auth: Auth
            ) {
    }

    ngOnInit(): void {
        this.initiativeService.getInitiatives().then((initiatives) => {
            this.initiatives = Array.from(<Iterable<Initiative>> initiatives.values());
        });

        this.subscriptions.push(this.auth.getUserPermissions().subscribe(permissions => {
            this.auth.setUserPermissions(permissions);
        }))

        this.subscriptions.push(this.scrollService.scrolled.subscribe(() => {
            let o = this.scrollService.currentScrollTop / 400;
            this.shadowStyle = {
                'background-color': `rgba(20, 20, 40, ${o})`,
            };
        }));
    }

    search() {
        this.router.navigate(['/search']);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

}
