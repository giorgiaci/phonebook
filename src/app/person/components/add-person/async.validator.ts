import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../../models/person.model';
import { PersonConverter } from '../../converter/person.converter';
import { PersonaDTO } from '../../dtos/persona.dto';
import { PersonsService } from '../../services/persons.service';



@Injectable({
  providedIn: 'root',
})
export class UserValidators {
  private person: Person;
  private converterPersone: PersonConverter;

  constructor(private http: HttpClient, private personService:PersonsService) {}
  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.personService.findPersons(undefined, control.value).pipe(
        map(res => {
          // if email doesn't exist
          if (res && res.length>0) {
            // return error
            return { emailDoesntExists: true };
          }
        })
      );
    };
  }
  // searchUserAsync(email) {
  
  //   return this.http
  //     .get<PersonaDTO[]>(`http://localhost:3000/persons?email=${email}`)
  //     .pipe();
  // }

  // userValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
  //     return this.searchUserAsync(control.value).pipe(
  //       map(res => {
  //         // if email doesn't exist
  //         if (res.length) {
  //           // return error
  //           return { emailDoesntExists: true };
  //         } else {
  //           return null;
  //         }
  //       })
  //     );
  //   };
  // }
}

 