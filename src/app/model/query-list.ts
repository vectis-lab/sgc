export class Query {
    constructor(public term: string, public verified: boolean) {
    }
}

export class Queries {
    constructor(public queries: Query[]) {
        queries = [];
    }

    addQuery(term){
        this.queries.push({
            term: term,
            verified: false
        })
    }

    termToQueries(terms: string[]){
        this.queries = terms.map(term => { 
            return new Query(term, false);
        })
    }
} 
