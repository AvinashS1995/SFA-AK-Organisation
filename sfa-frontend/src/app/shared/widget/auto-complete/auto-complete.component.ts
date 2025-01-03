import { ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { EventEmitter } from '@angular/core';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { SelectInputItem } from '../../interfaces/common';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'ak-auto-complete',
  standalone: true,
  imports: [],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true
    }
  ]
})
export class AutoCompleteComponent {

  @Input() class = '';
  @Input() rows = '3';
  @Input() label = "";
  @Input() placeholder = '';
  @Input() preFix = '';
  @Input() formControlName = '';
  @Input() inputWidth = "100%";
  @Input() leftHint = "";
  @Input() rightHint = "";
  @Input() customError: string = "";
  @Input() passwordToggle: boolean = false;
  @Output('onInput') onInput = new EventEmitter();
  @Output('onSelectionChange') onSelectionChange = new EventEmitter();

  control!: FormControl;
  onChange: any = () => { };
  onTouched: any = () => { };
  pwToggle: boolean = false;
  validationRequired: boolean = false;

  @Input('value') _value!: SelectInputItem;
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  get value() {
    return this._value;
  }

  filteredOptions: Array<SelectInputItem> = [];

  _options!: Array<SelectInputItem>;
  get options(): Array<SelectInputItem> {
    return this._options;
  }
  @Input() set options(value: Array<SelectInputItem>) {
    this._options = this.filteredOptions = value;
  }
  optionSelected = '';

  constructor(private commonService: CommonService, private controlContainer: ControlContainer, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.controlContainer.control) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
      // this.control.setValidators([this.RequireMatch]);
      this.control.addValidators([this.RequireMatch]);
      if (this.control.validator) {
        const validator = this.control.validator && this.control.validator({} as AbstractControl);
        this.validationRequired = validator && validator ? true : false;
        // if (this.validationRequired) {
        //   if (this.label.charAt(this.label.length - 1) !== "*") {
        //     this.label = this.label + " *";
        //   }
        // }
      }
    }
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }


  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(value: SelectInputItem) {
    this.value = value;
    this.onInput.emit(value)
    this.onSelectionChange.emit(value)
  }

  RequireMatch(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      if (control.validator) {
        const validator = control.validator && control.validator({} as AbstractControl);
        if (validator) {
          if (validator) {
            return { incorrect: true };
          } else {
            if (!selection || selection === '') {
              return null;
            } else {
              return { incorrect: true };
            }
          }
        } else {
          if (!selection || selection === '') {
            return null;
          } else {
            return { incorrect: true };
          }
        }
      } else {
        if (!selection || selection === '') {
          return null;
        } else {
          return { incorrect: true };
        }
      }
    }
    return null;
  }


  getFieldErrorDesc(): string {
    if (this.control?.errors) {
      if (this.control.dirty || this.control.touched) {
        if (this.customError.length) {
          return this.customError;
        }
        return this.commonService.getFieldErrorDesc(this.control);
      }
    }
    return "";
  }

  onItemSearch(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    let searchText = element.value;
    this.onInput.emit(searchText)
    if (searchText !== "") {
      this.filteredOptions = this.defaultFilterFn(searchText);
    } else {
      this.filteredOptions = this.options;
    }
  }

  private defaultFilterFn(value: any) {
    let name = value;

    if (value && typeof value === 'object') {
      name = value.name;
    }

    return this.options.filter(
      o => o.label.toLowerCase().indexOf(name ? name.toLowerCase() : '') !== -1
    );
  }

  defaultDisplayFn(value: any) {
    return value ? value.label : value;
  }

}
