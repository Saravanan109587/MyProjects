import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmptyStringVallidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmptyStringVallidatorDirective,
      multi: true
    }
  ]
})
export class EmptyStringVallidatorDirective implements Validator {
  @Input()
  appEmptyStringVallidator:string|number
  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value !=undefined) {
      if(typeof(control.value)=='string'){
        if (control.value.trim() ===this.appEmptyStringVallidator) {
          return { 'EmptyString': true };
  
        }
        else {
          return null;
        }

      }
      else if(typeof(control.value=='number')){
        if (control.value ==this.appEmptyStringVallidator) {
          return { 'EmptyString': true };
  
        }
        else {
          return null;
        }

      }
    

    }

  }


}
