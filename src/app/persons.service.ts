/*    
find(criterioDto:any): Observable<Person[]>
getPerson(cf:string): Observable<Person>
deletePerson(cf:string):Observable<Person>
save(daSalvare:Person):Observable<Person>
update(daAggiorano:Person):Observable<Person>
*/
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Person } from './person.model';
import { PHONEBOOK_CONTACTS } from './phoneBookContact';

@Injectable({ providedIn: 'root' })
export class PersonsService {
  private persons: Array<Person>;

  constructor() {
    this.persons = PHONEBOOK_CONTACTS;
    
  }

  public getPersons(): Observable<Person[]> {
    return of(PHONEBOOK_CONTACTS);
  }

  public findPersons(surname: string): Observable<Person[]> {
    return of(PHONEBOOK_CONTACTS).pipe(
      map((p) => {
        if (!surname || surname.length === 0) {
          return p;
        }
        let filteredContacts: Person[] = [];
        p.forEach((person) => {
          if (person.surname.toLowerCase().includes(surname.toLowerCase())) {
            filteredContacts.push(person);
          }
        });

        return filteredContacts;
      })
    );
  }
 /* public createPersons(surname: string): Observable<Person[]> {
    return of(PHONEBOOK_CONTACTS).pipe(
       map((p) => {
      if (surname || surname.length === 0) {
        return p;
      }
      let filteredContacts: Person[] = [];
      p.forEach((person) => {
        if (person.surname.toLowerCase().includes(surname.toLowerCase())) {
          filteredContacts.push(new Person());
        }
              
      });

      return PHONEBOOK_CONTACTS.concat(filteredContacts);
    })
  );
  }*/
  public createPersons(person:Person): Observable<Person> {    
      this.persons.push(person);
       return of (person);
  }
}
