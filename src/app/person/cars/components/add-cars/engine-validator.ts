import { FormControl } from "@angular/forms";

export class EngineValidator {
   
    static lengthFormat(lengthmin: number, lengthmax: number) {

    

      return (control: FormControl): { [s: string]: boolean } => {
        
        if(!control.value){
          return;
        } 
  
        if (isNaN(control.value) ||control.value < lengthmin || control.value > lengthmax) {
          return { incorrectLength: true };
        }
        
        
        return null;
      }
    }
}
  