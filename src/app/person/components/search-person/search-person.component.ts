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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.phonebook.getPersons().subscribe((persons) => {
      this.searchResult = persons;
    });
    this.inizializzaForm();
  }

  inizializzaForm() {
    this.searchForm = this.fb.group({
      surnameCriteria: ['', [Validators.required]],
      email: ['', [Validators.required]],
      criteria: ['', [Validators.required]],
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
  resetForm(){
    this.searchForm.reset();
    this.phonebook.getPersons().subscribe(
      (p)=>{this.searchResult = p;}
    )
  }
}
