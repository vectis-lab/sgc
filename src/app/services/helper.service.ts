import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { MAXIMUM_NUMBER_OF_VARIANTS } from "./cttv-service";
import { VariantTrackService } from "./genome-browser/variant-track-service";
import { FAKE_CLINICAL_DATA } from "../mocks/clindata";
import { VariantSearchService } from "./variant-search-service";
import * as seedrandom from "seedrandom";
import { Subscription } from "rxjs/Subscription";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HelperService {
    constructor() {}

    capitalizeCamelCase(data): string {
        return data.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
}
