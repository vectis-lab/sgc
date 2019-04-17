import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-samples-text',
  templateUrl: './samples-text.component.html',
  styleUrls: ['./samples-text.component.css']
})
export class SamplesTextComponent implements OnInit {
  @Input() samples: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
