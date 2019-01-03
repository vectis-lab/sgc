import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cohort',
  templateUrl: './cohort.component.html',
  styleUrls: ['./cohort.component.css']
})
export class CohortComponent implements OnInit {
  @Input() title: string;
  @Input() imgSource: string;
  @Input() dialogContent: any; 
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(CohortDialog,{
      data: {
        content: this.dialogContent,
        title: this.title
      },
      width: '700px'
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'cohort-dialog',
  templateUrl: './cohort-dialog.html',
  styleUrls: ['./cohort.component.css']
})
export class CohortDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}