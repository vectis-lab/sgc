import { Component, OnInit } from '@angular/core';
import { CohortService } from '../../../services/project-data/cohort-service';

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.css']
})
export class CohortsComponent implements OnInit {
  cohorts: Array<any>;
  constructor(private cs: CohortService) { }

  ngOnInit() {
    this.cohorts = this.cs.getNewCohorts();
  }

}
