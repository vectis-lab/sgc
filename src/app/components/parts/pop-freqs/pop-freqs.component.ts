import { Component, Input, OnInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { VariantPopulationFrequency } from '../../../model/variant-annotations';

@Component({
    selector: 'app-pop-freqs',
    templateUrl: './pop-freqs.component.html',
    styleUrls: ['./pop-freqs.component.css']
})
export class PopFreqsComponent implements OnInit {
    @Input() variant: Variant;
    freqs: VariantPopulationFrequency[] = [];
    studies: Set<string>;
    populations: Set<string>;
    freqStudies = {};

    keys = [
        {prop: 'population'},
        {prop: 'refAlleleFreq'},
        {prop: 'altAlleleFreq'},
        {prop: 'refHomGenotypeFreq'},
        {prop: 'hetGenotypeFreq'},
        {prop: 'altHomGenotypeFreq'}
    ];

    constructor() {
    }

    ngOnInit() {

        this.freqs = this.variant.annotation.populationFrequencies;
        this.studies = new Set(this.freqs.map((f) => f.study).sort());
        this.populations = new Set(this.freqs.map((f) => f.population));
        this.studies.forEach((s) => {
            this.freqStudies[s] = this.freqs.filter((f) => f.study === s).sort((a, b) => {
                if (a.population === 'ALL') {
                    return -1;
                }
                if (b.population === 'ALL') {
                    return 1;
                }
                if (a.population < b.population ) {
                    return -1;
                }
                if (a.population > b.population) {
                    return 1;
                }
                return 0;
            });
        });
    }

}
