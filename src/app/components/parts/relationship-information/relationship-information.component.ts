import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-relationship-information',
  templateUrl: './relationship-information.component.html',
  styleUrls: ['./relationship-information.component.css']
})
export class RelationshipInformationComponent implements OnInit {
  relationships: any[];
  @Input('relationships') set allowDay(value: any[]) {
    this.relationships = value;
  }

  constructor() { }

  ngOnInit() {
  }

}
