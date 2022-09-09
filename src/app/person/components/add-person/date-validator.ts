import { FormControl } from "@angular/forms";
export class DateValidator {
    /*
      questa funzione riceve un control che rappresenta una data e restituisce un validatore
     che utilizza il control passato dinamicamente per comparare il valore del campo
     a cui verr' associato il validatore e compatibile con la data del control passato
     in ingresso   
     */
    static dateFormat(dateControl: FormControl) {

        return (control: FormControl): { [s: string]: boolean } => {
            if (!dateControl || !dateControl.value || !control.value) {
                return undefined
            }
            let date = +dateControl.value.split('-')[0];
            let now = new Date().getUTCFullYear();
            let eta = +control.value;
            if (eta !== (now - date)) {
                return { invalidAge: true }
            }
            return null;


        }
    }

}