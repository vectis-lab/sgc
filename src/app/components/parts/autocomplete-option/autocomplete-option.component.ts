import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-autocomplete-option',
  templateUrl: './autocomplete-option.component.html',
  styleUrls: ['./autocomplete-option.component.css']
})
export class AutocompleteOptionComponent implements OnInit, OnChanges {
  myControl = new FormControl();
  @Input() options: string[];
  @Input() selectedGenePanel: string = '';
  @Output() panel = new EventEmitter<string>();
  filteredOptions: Observable<string[]>;
  private subscription: Subscription[] = [];

  public form: FormGroup;

  constructor(private fb: FormBuilder,
            private route: ActivatedRoute) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.form = this.fb.group({
      panelForm: new FormControl({ value: '', disabled: this.options.length < 1})
  });

  this.subscription.push(this.route.params.subscribe(p => {
    if(p['panel']){
      this.selectedGenePanel = p['panel'];
    }
  }))
  }

  ngOnChanges(changes: any) {
    let optionsState = changes['options'];
    if(this.form && optionsState){
      const ctrl = this.form.get('panelForm');
      if(optionsState.currentValue.length > 0){
        ctrl.enable();
        ctrl.setValue(this.selectedGenePanel);
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  selectPanel(panel){
    if(this.options.includes(panel)){
      this.panel.emit(panel);
    }
  }
}
