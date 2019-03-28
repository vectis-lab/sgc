import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Mitochondria, Neuromuscular } from '../../../shared/cohortAuthor';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cohort-authors',
  templateUrl: './cohort-authors.component.html',
  styleUrls: ['./cohort-authors.component.css']
})
export class CohortAuthorsComponent implements OnInit, AfterViewInit, OnDestroy {
  mitochondriaAuthors = Mitochondria;
  neuromuscularAuthors = Neuromuscular;
  activeAnchor = '';
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.route.fragment.subscribe(fragment => { 
      this.activeAnchor =fragment;
    }));
  }

  ngAfterViewInit() {
    try {
      document.querySelector('#' + this.activeAnchor).scrollIntoView();
    } catch (e) { }
  }

  titleRowspan(arrayLength){
    return arrayLength/3;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
