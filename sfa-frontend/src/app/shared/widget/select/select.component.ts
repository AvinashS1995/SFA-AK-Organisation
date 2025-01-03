import {
  ControlContainer,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  AbstractControl,
} from '@angular/forms';
import { CommonService } from '../../services/common/common.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import { SelectInputItem } from '../../interfaces/common';

@Component({
  selector: 'ak-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {

  @Input() class = '';
  @Input() appearance = 'fill';
  @Input() name = 'select';
  @Input() label = 'Select';
  @Input() emptyOption = 'Select';
  @Input() showEmptyOption: boolean = false;
  @Input() optionArr: any = [];
  @Input() groupArray: Array<any> = [];
  @Input() selectedState: any = [];
  @Input() isMultiSelect = false;
  @Input() formControlName = '';
  @Input() customError = '';
  @Input() isDisabled: boolean = false;
  @Input() isSelectAll: boolean = false;
  @Input() selectAlltext: string = 'Select All';
  @Input() showHint: boolean = false;
  @Input() hintContent: any = '';
  @Input() showFilter: boolean = false;
  @Input() panelClass = '';
  @Output() selectedStateChange = new EventEmitter();
  @Output() selectedStateChangeAll = new EventEmitter();

  control!: FormControl;

  onChange: any = (val:any) => {};
  onTouched: any = () => {};
  validationRequired: boolean = false;

  @Input('value') _value: any;
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  get value() {
    return this._value;
  }
  public filteredList: any;

  constructor(
    private commonService: CommonService,
    private controlContainer: ControlContainer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.controlContainer.control) {
      this.control = this.controlContainer.control.get(
        this.formControlName
      ) as FormControl;
      if (this.control.validator) {
        const validator =
          this.control.validator &&
          this.control.validator({} as AbstractControl);
        this.validationRequired =
          validator && validator ? true : false;
        // if (this.validationRequired) {
        //     if (this.label.charAt(this.label.length-1) !== "*") {
        //         this.label = this.label + " *";
        //     }
        // }
      }
    }
  }
  // ngOnChanges(changes) {
  //   // this.selectionChangeAll(changes.optionArr.currentValue)
  // }

  ngAfterContentChecked() {
    if (this.showFilter) {
      this.filteredList = this.optionArr.slice();
      this.filteredList = this.filteredList;
    }
    this.cdr.detectChanges();
  }

  matFilter(event: any) {
    this.filteredList = event;
    this.cdr.detectChanges();
  }

  writeValue(event: any) {
    if (event) {
      if (typeof event === 'string') {
        this.value = event;
      } else if (typeof event === 'object') {
        this.value = event;
      } else {
        const element = event.currentTarget as HTMLInputElement;
        this.value = element?.value;
      }
    }
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  selectionChange(selectedOption: any) {
    this.selectedState = selectedOption;
    this.selectedStateChange.emit(selectedOption);
    // this.cdr.detectChanges();
  }
  selectionChangeAll(selectedOption: any) {
    console.log({});
    this.control.patchValue(
      selectedOption.map((data:any) => {
        data.isSelected = true;
      })
    );
    this.selectedState = selectedOption;
    this.selectedStateChangeAll.emit(selectedOption);
    this.cdr.detectChanges();
  }

  showFieldError() {
    if (this.control?.errors) {
      if (this.control.dirty || this.control.touched) {
        return true;
      }
    }
    return false;
  }

  getFieldErrorDesc() {
    if (this.customError.length) {
      return this.customError;
    }
    return this.commonService.getFieldErrorDesc(this.control);
  }

  compareFn(c1: SelectInputItem, c2: SelectInputItem): boolean {
    return c1 && c2
      ? JSON.stringify(c1.value) === JSON.stringify(c2.value)
      : c1 === c2;
  }
}
