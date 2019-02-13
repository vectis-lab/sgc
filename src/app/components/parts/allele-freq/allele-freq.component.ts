import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../../../services/table-service';

@Component({
    selector: 'app-allele-freq',
    templateUrl: './allele-freq.component.html',
    styleUrls: ['./allele-freq.component.css']
})

export class AlleleFreqComponent implements OnInit {
    @Input() freq: number;
    @Input() highlight: number;
    @Input() color = 'steelblue';
    style: any;
    formattedFreq: string;
    scales: number[] = [
        1 / 10000.0,
        1 / 1000.0,
        1 / 100.0,
        5 / 100.0,
        1 / 2.0
    ];

    constructor(public ts: TableService) {}

    ngOnInit() {
        this.style = this.highlight?{'background-color': 'red'}:{'background-color': this.color};
        if (this.freq !== null) {
            this.formattedFreq = this.freq.toFixed(6);
        }
    }

}

