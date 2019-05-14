import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { SearchOption } from '../../../model/search-option';
import { SearchBarService } from '../../../services/search-bar-service';
import { Subscription } from 'rxjs/Subscription';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-option',
    templateUrl: './search-option.component.html',
    styleUrls: ['./search-option.component.css']
})
export class SearchOptionComponent implements OnInit {
    @Input() option: SearchOption;
    showOptions = false;
    subscriptions: Subscription[] = [];
    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.showOptions = false;
        }
    }
    cohort: string;

    constructor(private elf: ElementRef, private searchBarService: SearchBarService, private route: ActivatedRoute,) {
    }

    ngOnInit() {
        this.subscriptions.push(this.route.params.subscribe(p => {
            if(p['cohort']){
                this.option.setValue(p['cohort']);
            }
        }));
    }

    selectOption(selected: string) {
        this.option.setValue(selected);
        this.searchBarService.options[0].setValue(selected);
    }
}
