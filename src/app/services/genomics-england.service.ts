import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { constants } from '../app.constants';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, forkJoin } from "rxjs";
import {switchMap} from 'rxjs/operators'
import {Panel} from '../model/panel'

@Injectable()
export class GenomicsEnglandService {
    panels: Panel[];
    constructor(private http: HttpClient) {
    }

    getPanels(url,fullData:any[]):Observable<any[]>
    {
      fullData=fullData || []
      return this.http.get(url).pipe(
        switchMap((data:any)=>{
          fullData=fullData.concat(data.results.map(panel => new Panel(panel.name, panel.stats.number_of_genes)));
          return !data.next? of(fullData):
                 this.getPanels(data.next,fullData)
        })
      )
    }

    getPanel(panelName): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*');

        return this.http.get(`https://panelapp.genomicsengland.co.uk/api/v1/panels/${panelName}/`, {headers: headers})
            .map((data) => {
                return data;
            })
            .catch((e) => {
                Raven.captureMessage("GENOMICS ENGLAND: " + JSON.stringify(e));
                return of([]);
            });
    }


}



