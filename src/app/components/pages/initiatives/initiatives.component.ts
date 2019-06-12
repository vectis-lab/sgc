import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';

@Component({
    selector: 'app-initiatives',
    templateUrl: './initiatives.component.html',
    styleUrls: ['./initiatives.component.css']
})
export class InitiativesComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];


    constructor(public scrollService: ScrollService
            ) {
    }

    ngOnInit(): void {

    }

    search() {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

}
