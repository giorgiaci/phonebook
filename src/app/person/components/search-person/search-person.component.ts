import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/person.model';
import { PersonsService } from '../../services/persons.service';
import { UserValidators } from '../add-person/async.validator';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css'],
})
export class SearchPersonComponent implements OnInit {
  person: Person;
  searchResult: Array<Person>;
  searchForm: FormGroup;

  constructor(
    private phonebook: PersonsService,
    private fb: FormBuilder,
    private service: UserValidators
  ) {}

  ngOnInit() {
    this.phonebook.getPersons().subscribe((persons) => {
      this.searchResult = persons;
    });
    this.inizializzaForm();
  }

  inizializzaForm() {
    this.searchForm = this.fb.group({
      surnameCriteria: [undefined, [Validators.required]],
      // email: this.fb.control(undefined,
      //   // custom async validator
      //   this.service.userValidator())
      email: [undefined, [Validators.required]],
      criteria: [undefined, [Validators.required]],
    });
  }
  search() {
    let formValue = this.searchForm.value;
    let newPersonSearch = new Person();
    newPersonSearch.surname = formValue.surnameCriteria;
    newPersonSearch.email = formValue.email;

    this.phonebook
      .findPersons(newPersonSearch.surname, newPersonSearch.email)
      .subscribe((person) => {
        if (newPersonSearch.surname || newPersonSearch.email) {
          return (this.searchResult = person);
        } else {
          (error) => {
            console.error('', error);
          };
        }
      });
  }
  // this.phonebook.find2(formValue).subscribe(

  //   (persons) => {
  //     if( this.person.name == formValue ||
  //         this.person.surname == formValue ||
  //         this.person.email == formValue ||
  //         this.person.codFiscale == formValue
  //       ){

  //           return this.searchResult = persons;
  //       }

  //       else{
  //         (error) => { console.error('', error) }
  //       }

  //   }
  // );
  // }
}
