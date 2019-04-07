import { Injectable } from "@angular/core";

@Injectable()
export class HelperService {
    constructor() {}

    capitalizeCamelCase(data): string {
        return data.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
}
