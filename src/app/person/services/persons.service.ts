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

import { Person } from '../models/person.model';
// import { PHONEBOOK_CONTACTS } from './phoneBookContact';

import { HttpClient, HttpParams } from '@angular/common/http';
import { PersonConverter } from '../converter/person.converter';
import { PersonaDTO } from '../dtos/persona.dto';


@Injectable({ providedIn: 'root' })
export class PersonsService {
  private email;
  private surname;

  private person: Person;
  private persons: Array<Person>;
  private converterPersone: PersonConverter;

  constructor(private http: HttpClient) {
    // this.persons = PHONEBOOK_CONTACTS;
    this.converterPersone = new PersonConverter();
  }
  public find2(criteria?: any) {
    //if criteria has property..
    let queryParams = new HttpParams();
      if (criteria) {
        queryParams = queryParams.set('name', criteria);
      }else if (criteria){
        queryParams = queryParams.set('surname', criteria);
      }else if (criteria){
        queryParams = queryParams.set('email', criteria);
      }else if (criteria){
        queryParams = queryParams.set('fiscalcode', criteria);
      }       
      
    return this.http
      .get(`http://localhost:3000/persons`, { params: queryParams })
      .pipe(
        map((personaBack: PersonaDTO[]): Person[] => {
          let personaConvertita = [];
          personaBack.forEach((persona) => {
            personaConvertita.push(this.converterPersone.toModel(persona));
          });
          return personaConvertita;
        })
      );
  }
  public findPersons( __surname?: string, __email?: string): Observable<Person[]> {
    let queryParams = new HttpParams();
    if (__surname) {
      queryParams = queryParams.set('cognome', __surname);
    }
    if (__email) {
      queryParams = queryParams.set('email', __email);
    }
    return this.http
      .get(`http://localhost:3000/persons`, { params: queryParams })
      .pipe(
        map((personaBack: PersonaDTO[]): Person[] => {
          let personaConvertita = [];
          personaBack.forEach((persona) => {
            personaConvertita.push(this.converterPersone.toModel(persona));
          });
          return personaConvertita;
        })
      );
  }
  // public findPersons(surname: string): Observable<Person[]> {
  //   return this.http.get <PersonaDTO[] > ('http://localhost:3000/persons/').pipe(
  //     map((personBackEnd:PersonaDTO[]) => {
  //       if (!surname || surname.length === 0) {
  //         return [];
  //       }
  //       let filteredContacts: Person[] = [];
  //       personBackEnd.forEach((person) => {
  //         if (person.cognome.toLowerCase().includes(surname.toLowerCase())) {
  //           filteredContacts.push(this.converterPersone.toModel(person));
  //         }
  //       });

  //       return filteredContacts;
  //     })
  //   );
  // }
  // public findPersons(surname: string): Observable<Person[]> {
  //   return of(PHONEBOOK_CONTACTS).pipe(
  //     map((p) => {
  //       if (!surname || surname.length === 0) {
  //         return p;
  //       }
  //       let filteredContacts: Person[] = [];
  //       p.forEach((person) => {
  //         if (person.surname.toLowerCase().includes(surname.toLowerCase())) {
  //           filteredContacts.push(person);
  //         }
  //       });

  //       return filteredContacts;
  //     })
  //   );
  // }

  public getPersona(id: number): Observable<Person> {
    // return of(this.persons.find(person => person.id === id));
    return this.http
      .get<PersonaDTO>('http://localhost:3000/persons/' + id)
      .pipe(
        map(
          (personaSingolaBack: PersonaDTO): Person => {
            let personaSingola = this.converterPersone.toModel(
              personaSingolaBack
            );
            return personaSingola;
          }
        )
      );
  }

  public getPersons(): Observable<Person[]> {
    return this.http.get('http://localhost:3000/persons').pipe(
      map((personeBackEnd: PersonaDTO[]): Person[] => {
        if (!personeBackEnd) {
          return [];
        }
        let personeConvertite = [];
        personeBackEnd.forEach((p) => {
          personeConvertite.push(this.converterPersone.toModel(p));
        });
        return personeConvertite;
      })
    );
  }

  public createPersons(person: Person): Observable<Person> {
    let dto = this.converterPersone.toDto(person);
    return this.http
      .post<PersonaDTO>('http://localhost:3000/persons', dto)
      .pipe(
        map((personDalBackEnd: PersonaDTO) => {
          return this.converterPersone.toModel(personDalBackEnd);
        })
      );
  }
  public modifyPerson(person: Person): Observable<Person> {
    let dto = this.converterPersone.toDto(person);
    return this.http
      .put<PersonaDTO>(`http://localhost:3000/persons/${person.id}`, dto)
      .pipe(
        map((personaDalBackEnd: PersonaDTO) => {
          return this.converterPersone.toModel(personaDalBackEnd);
        })
      );
  }
  public deletePerson(id: number): Observable<Person> {
    const url = `http://localhost:3000/persons/${id}`; //localhost:3000/persons/3
    return this.http.delete(url).pipe(
      map((personDalBackEnd: PersonaDTO) => {
        return this.converterPersone.toModel(personDalBackEnd);
      })
    );
  }
}
