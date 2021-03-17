import { FormControl } from '@angular/forms';

export class EmailValidator {
  static mailFormat(control: FormControl): { [s: string]: boolean } {
    var email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if(!control.value){
      return;
    } 

    if (control.value != '' && (control.value.length <= 5 || !email.test(control.value))) {
      return { incorrectMailFormat: true };
    }

    return null;
  }
}
