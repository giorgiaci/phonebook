import { FormControl } from '@angular/forms';

export class MaxLengthValidator {
  static lengthFormat(control: FormControl): { [s: string]: boolean } {
    if (control.value.length >= 10) {
      return { incorrectMaxLength: true };
    }
    
    return null;
  }

  static parametricLengthFormat(length: number) {

    

    return (control: FormControl): { [s: string]: boolean } => {

      if(!control.value){
        return;
      } 

      if (control.value.length >= length) {
        return { incorrectMaxLength: true };
      }
      
      return null;
    }
  }
}
