import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

function convert(dob: Date): number {
  var dob = new Date();
  //calculate month difference from current date in time
   var month_diff = Date.now() - dob.getTime();
  
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff); 
  
  //extract year from date    
   var year = age_dt.getUTCFullYear();
  
  //now calculate the age of the user
  var finalAge = Math.abs(year - 1970);

  return finalAge;
}
/** A hero's name can't match the hero's alter ego */
export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const birthday = control.get('birthday');
  const age = control.get('age');

  return birthday && age && birthday.value === age.value ? { DateValidator: true } : null;
};