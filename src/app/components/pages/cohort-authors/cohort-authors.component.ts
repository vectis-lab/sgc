import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Mitochondria, Neuromuscular } from '../../../shared/cohortAuthor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cohort-authors',
  templateUrl: './cohort-authors.component.html',
  styleUrls: ['./cohort-authors.component.css']
})
export class CohortAuthorsComponent implements OnInit, AfterViewInit {
  mitochondriaAuthors = Mitochondria;
  neuromuscularAuthors = Neuromuscular;
  activeAnchor = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { 
      this.activeAnchor =fragment;
    });
  }

  ngAfterViewInit() {
    try {
      document.querySelector('#' + this.activeAnchor).scrollIntoView();
    } catch (e) { }
  }

  titleRowspan(arrayLength){
    return arrayLength/3;
  }

  
}
