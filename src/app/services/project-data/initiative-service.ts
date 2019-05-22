import { Injectable } from '@angular/core';
import { Initiative } from '../../model/initiative';

/* tslint:disable:max-line-length */
const INITIATIVES = new Map<string, Initiative>([
    [
        'id',
        {
            id: 'id',
            title: 'title',
            summary: 'summary',
            aim: 'aim',
            methods: `methods`,
            outcome: `outcome`,
            cohorts: ['schizophrenia', 'mendelian_disorders', 'epilepsy', 'melanoma', 'mitochondrial', 'congenital', 'rare_disease', 'retinal', 'bone', 'cardiomyopathies'],
            people: ['murraycairns', 'grahammann', 'carolynsue', 'sallydunwoodie'],
            genomes: '2295',
            sequenced: '1689',
            logo: '',
            heights: [],
            sex: [],
            weights: [],
            ages: []
        }
    ],
]);

@Injectable()
export class InitiativeService {
    getInitiatives(): Promise<Map<string, Initiative>> {
        return Promise.resolve(INITIATIVES);
    };

    getInitiative(id: string): Promise<Initiative> {
        return this.getInitiatives()
            .then(initiatives => initiatives.get(id));
    }
}
