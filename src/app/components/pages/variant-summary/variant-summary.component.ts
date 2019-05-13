import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { VariantSummarySearchService } from '../../../services/variant-summary-search-service';
import { SearchQueries } from '../../../model/search-query';
import { VariantSummary } from '../../../model/variant-summary';
import { BeaconCache, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Gene } from '../../../model/gene';
import { RegionService } from '../../../services/autocomplete/region-service';
import { Region } from '../../../model/region';
import { SearchOption } from '../../../model/search-option';
import { Auth } from '../../../services/auth-service';

@Component({
    selector: 'app-variant-summary',
    templateUrl: './variant-summary.component.html',
    styleUrls: ['./variant-summary.component.css', '../../../shared/meta-information.css'],
    providers: [VariantSummarySearchService, BeaconSearchService]
})
export class VariantSummaryComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    variant: VariantSummary;
    dbSnpUrl = VariantSummary.dbSnpUrl;
    beacons: BeaconCache;
    gene: Gene;
    showBeacon = false;
    error = '';
    beaconError = '';
    loading = true;
    beaconSupported = true;
    displayName = VariantSummary.displayName;

    constructor(private route: ActivatedRoute,
                private vss: VariantSummarySearchService,
                private bss: BeaconSearchService,
                private rs: RegionService,
                private cd: ChangeDetectorRef,
                private auth: Auth) {
    }

    ngOnInit() {
        if (!this.auth.authenticated()) {
            this.auth.login();
        } else {
            this.subscriptions.push(this.bss.errors.subscribe((e: any) => {
                this.beaconError = e.message ? e.message : e;
            }));
            this.subscriptions.push(this.route.params.subscribe(p => this.parseParams(p)));
        }
    }

    parseParams(params: Params) {
        try {
            const r = /([\dxy]*)-(\d*)-([AGTC\*]*)-([AGTC\*]*)+/ig;
            const m = r.exec(params['query']);
            const chromo = m[1];
            const start = Number(m[2]);
            const reference = m[3];
            const alternate = m[4];

            const sq = new SearchQueries([new Region (chromo, start, start)], [new SearchOption('', 'returnAnnotations', [], 'true')]);
            this.getVariant(sq, reference, alternate);
        } catch (e) {
            this.error = 'Could not find specified variant';
            this.loading = false;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    beaconQuery(v: VariantSummary) {
        return `${ v.chr }:${ v.start }>${v.alt}`;
    }

    toggleBeacon() {
        this.showBeacon = !this.showBeacon;
    }

    private getVariant(sq: SearchQueries, reference: string, alternate: string) {
        this.vss.getVariants(sq).then(variants => {
            this.loading = false;
            const vf = variants.filter((v) => v.alt === alternate && v.ref === reference);
            if (vf.length > 1) {
                this.error = 'Found more than one variant for query';
            } else if (vf.length > 0) {
                this.variant = vf[0];
                if (this.variant.type !== 'SNP') {
                    this.beaconSupported = false;
                } else {
                    this.beacons = this.bss.searchBeacon(this.beaconQuery(this.variant));
                    this.subscriptions.push(this.beacons.results.debounceTime(500).subscribe(() => {
                        this.cd.detectChanges();
                    }));
                }

                const r = new Region(this.variant.chr, this.variant.start, this.variant.start);
                this.rs.getGenesInRegion(r).subscribe((g) => {
                    if (g.length > 0) {
                        this.gene = g[0];
                    }
                }, (e) => {});
            } else {
                this.error = 'Found no variants for query';
            }
            this.cd.detectChanges();
        });
    }
}
