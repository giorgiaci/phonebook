import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PersonsService } from '../../services/persons.service';
import { EmailValidator } from '../add-person/email-validator';
import { MaxLengthValidator } from '../add-person/maxLength-validator';
import { UserValidators } from './async.validator';

import { DateValidator } from './date-validator';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddPersonComponent implements OnInit {
  personForm: FormGroup;
  person: Person;

  constructor(
    private phonebook: PersonsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private service:UserValidators
  ) {}

  ngOnInit() {
    const idModified = +this.activateRoute.snapshot.paramMap.get('idPerson');
console.log(idModified, 'hello')
    this.inizializzaForm();
    this.getPerson(idModified);
  }

  getPerson(idModified): void {
    
      this.phonebook.getPersona(idModified).subscribe((person) => {

        this.personForm.get('firstName').setValue(person.name);
        console.log(person.name)
        this.personForm.get('lastName').setValue(person.surname);
        this.personForm.get('fiscalCode').setValue(person.codFiscale);
        this.personForm.get('birthday').setValue(person.birthdate);
        this.personForm.get('age').setValue(person.age);
        this.personForm.get('phoneNumber').setValue(person.phoneNumber);
        this.personForm.get('email').setValue(person.email);
        
        this.personForm.get('address.street').setValue(person.street);
        this.personForm.get('address.city').setValue(person.city);
        this.personForm.get('address.state').setValue(person.state);
        this.personForm.get('address.zip').setValue(person.zip);

        this.person = person;
      
      });
    
  }
  onSubmit() {
    if (this.person) {
      this.onSubmitModified();
    } else {
      let formValue = this.personForm.value;

      let newPerson = new Person();
      newPerson.name = formValue.firstName;
      newPerson.surname = formValue.lastName;
      newPerson.codFiscale = formValue.fiscalCode;
      newPerson.birthdate = formValue.birthday;
      newPerson.age = formValue.age;
      newPerson.phoneNumber = formValue.phoneNumber;
      newPerson.email = formValue.email;

      newPerson.street = formValue.address.street;
      newPerson.city = formValue.address.city;
      newPerson.state = formValue.address.state;
      newPerson.zip = formValue.address.zip;

      this.phonebook.createPersons(newPerson).subscribe(
        (ok) => {
          alert('person saved');
          this.router.navigate(['person', 'search']);
        } ,
        (error) => {
          console.error('', error);
        }
      );
    }
  }
  onSubmitModified() {
    let formValue = this.personForm.value;

    this.person.name = formValue.firstName;
    this.person.surname = formValue.lastName;
    this.person.codFiscale = formValue.fiscalCode;
    this.person.birthdate = formValue.birthday;
    this.person.age = formValue.age;
    this.person.phoneNumber = formValue.phoneNumber;
    this.person.email = formValue.email;

    this.person.street = formValue.address.street;
    this.person.city = formValue.address.city;
    this.person.state = formValue.address.state;
    this.person.zip = formValue.address.zip;

    this.phonebook.modifyPerson(this.person).subscribe(
      (ok) => {
        alert('person modified');
        this.router.navigate(['person', 'search']);
      } ,
      (error) => {
        console.error('', error);
      }
    );
  }

  settaSalti(){
    this.personForm.get('salti').setValue(666);
  }

  inizializzaForm() {
    let birthday = this.fb.control(undefined, [Validators.required]);

    this.personForm = this.fb.group({
      //salti:[0],
      firstName: [undefined, Validators.required],
      lastName: [undefined, [Validators.required, Validators.maxLength(10)]],
      fiscalCode: [
        undefined,
        [Validators.required, MaxLengthValidator.parametricLengthFormat(10)],
      ],
      birthday: birthday,
      age: [
        undefined,
        [Validators.required, DateValidator.dateFormat(birthday)],
      ],
      phoneNumber: [undefined, Validators.required],
      email: [undefined, 
        [Validators.required, EmailValidator.mailFormat,
        // custom async validator
      ],  this.service.userValidator()],
      address: this.fb.group(
        {
          street: [undefined],
          city: [undefined],
          state: [undefined],
          zip: [undefined],
        },
        { validators: AddressValidator }
      ),
    });

    function AddressValidator(group: AbstractControl) {
      if (!group.value) {
        return null;
      }

      if (
        (!group.value.street &&
          !group.value.city &&
          !group.value.state &&
          !group.value.zip) ||
        (group.value.street &&
          group.value.city &&
          group.value.state &&
          group.value.zip)
      ) {
        
        return null;
      } else {
         console.error('errore');

        return { invalid: true };
      }
    }
  }
}