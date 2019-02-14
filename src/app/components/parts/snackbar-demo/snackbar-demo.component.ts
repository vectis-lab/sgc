import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

@Component({
    selector: 'app-snackbar-demo',
    templateUrl: './snackbar-demo.component.html',
    styleUrls: ['./snackbar-demo.component.css']
})
export class SnackbarDemoComponent implements OnInit {
    query: any;

    constructor(private sb: MatSnackBar, private clinicalFilteringService: ClinicalFilteringService) {
    }

    ngOnInit() {
    }

    exitDemo() {
        this.clinicalFilteringService.clearFilters();
        this.sb.dismiss();
    }

}
