import { SearchOption } from './search-option';
import { Region } from './region';

export class SearchQueries {
    constructor(public regions: Region[],
                public options: SearchOption[]
        ){
    }
}