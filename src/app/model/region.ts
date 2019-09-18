export class Region {
    constructor(public chromosome: string,
                public start: number,
                public end: number,
                public genes: GeneDetails[] = []) {
    };

    name() {
        return `${this.chromosome}:${this.start}-${this.end}`;
    }
}

export class GeneDetails {
    constructor(public chromosome: string,
        public start: number,
        public end: number,
        public symbol: string) {
};
}
