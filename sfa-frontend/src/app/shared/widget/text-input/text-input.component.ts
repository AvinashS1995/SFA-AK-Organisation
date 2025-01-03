import { Component, Input, ChangeDetectorRef, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, FormControl, AbstractControl } from '@angular/forms';

import { CommonService } from '../../services/common/common.service';
// import { RemoveUnderscorePipe } from '../../pipes/remove-underscore.pipe';

@Component({
  selector: 'ak-text-input',
  standalone: true,
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    }
  ]
})
export class TextInputComponent {

  @Input() class = '';
  @Input() appearance = 'fill';
  @Input() inputType = 'text';
  @Input() rows = '3';
  @Input() label = "";
  @Input() placeholder = '';
  @Input() disabledFieldError: string = "";
  @Input() preFix = '';
  @Input() isClearable = true;
  @Input() isDisabled = false;
  @Input() showCharCount = false;
  @Input() formControlName = '';
  @Input() isAutocompleteOff = 'off';
  @Input() inputWidth = "100%";
  @Input() leftHint = "";
  @Input() rightHint = "";
  @Input() customError: string = "";
  @Input() passwordToggle: boolean = false;
  @Input() isCustomIcon: boolean = false;
  @Input() customIcon: string = "";
  @Input() isReadOnly: boolean = false;
  @Input() hasMask: boolean = false;
  @Input() mask: Array<string> = [];
  @Input() noPaste: boolean = false;
  @Input() convertUpperCase: boolean = false;
  @Input() min = '0';
  @Input() maxLength: number = 10000;
  @Input() inputValue: string = '';

  @Output('blurEvent') blurEvent = new EventEmitter();
  @Output('clickedEvent') clickedEvent = new EventEmitter();
  @Output('keyupEvent') keyupEvent = new EventEmitter();

  extraLength: number = 0;

  control!: FormControl;
  onChange: any = () => { };
  onTouched: any = () => { };
  pwToggle: boolean = false;
  validationRequired: boolean = false;

  @Input('value') _value = "";
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  get value() {
    return this._value;
  }

  constructor(private commonService: CommonService, private controlContainer: ControlContainer, private cdr: ChangeDetectorRef) {
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    if (this.noPaste) {
      e.preventDefault();
    }
  }

  ngOnInit(): void {
    if (this.controlContainer.control) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
      if (this.control.validator) {
        const validator = this.control.validator && this.control.validator({} as AbstractControl);
        this.validationRequired = validator && validator ? true : false;
        // if (this.validationRequired) {
        //     if (this.label.charAt(this.label.length - 1) !== "*") {
        //         this.label = this.label + " *";
        //     }
        // }
      }
    }
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  onBlurEvent(event: any) {
    // this.value = event.target.value.trim();
    this.blurEvent.emit(event);
  }

  onClickedEvent(event: any) {
    this.clickedEvent.emit(event);
  }

  writeValue(event: any) {

    if (event) {
      if (typeof event === "string") {
        this.value = event;
        if (this.inputType === "textarea") {
          this.value.replace(/\n\r?/g, '<br />');
          this.value.trim();
        } else {
          this.value.trim();
          if (this.convertUpperCase) {
            this.value = this.value.toUpperCase();
            event = event.toUpperCase();
          }
        }
      } else {
        const element = event.currentTarget as HTMLInputElement
        if (element) {
          this.value = element?.value;
          if (this.convertUpperCase) {
            element.style.textTransform = 'uppercase';
          }
        }
      }
      this.keyupEvent.emit(event);
    }
  }



  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  getFieldErrorDesc(): string {
    if (this.control?.errors) {
      /* if (this.control?.errors?.maxlength) {
          this.extraLength = this.control?.errors?.maxlength?.actualLength - this.control?.errors?.maxlength?.requiredLength;
          if (this.extraLength>=1) {
              this.control.setValue(this.value.substr(0, this.value.length-this.extraLength));
              return "";
          }
      } */
      if (this.control.dirty || this.control.touched) {
        if (this.customError.length) {
          return this.customError;
        }
        return this.commonService.getFieldErrorDesc(this.control);
      }
    }
    return "";
  }

  call() {
  }

}
