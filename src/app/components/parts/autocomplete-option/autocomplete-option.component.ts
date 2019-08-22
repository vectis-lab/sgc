import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Panel } from '../../../model/panel';

@Component({
  selector: 'app-autocomplete-option',
  templateUrl: './autocomplete-option.component.html',
  styleUrls: ['./autocomplete-option.component.css']
})
export class AutocompleteOptionComponent implements OnInit, OnChanges {
  myControl = new FormControl();
  @Input() options: Panel[];
  @Input() selectedGenePanel: string = '';
  @Output() panel = new EventEmitter<string>();

  filteredOptions: Observable<Panel[]>;
  private subscription: Subscription[] = [];

  public form: FormGroup;

  constructor(private fb: FormBuilder,
            private route: ActivatedRoute) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => { return this._filter(value)})
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
    let selectedGeneState = changes['selectedGenePanel'];
    if(this.form){
      const ctrl = this.form.get('panelForm');
      if(optionsState){
        if(optionsState.currentValue.length > 0){
          ctrl.enable();
          ctrl.setValue(this.selectedGenePanel);
        }
      }
      if(selectedGeneState && selectedGeneState.currentValue===''){
          ctrl.enable();
          ctrl.setValue('');
      }
    }

  }

  private _filter(value: string): Panel[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name && option.name.toLowerCase().includes(filterValue));
  }

  selectPanel(panel){
    if(this.options.map(o => o.name).includes(panel)){
      this.panel.emit(panel);
    }
  }
}
