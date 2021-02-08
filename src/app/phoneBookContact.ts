import { Person } from "./person.model";


var persons: Array<Person> = [];

var person1: Person = new Person();
person1.name = 'Giorgia';
person1.surname = 'Ciulla';
person1.phoneNumber = 111111;
persons.push(person1);

var person2: Person = new Person();
person2.name = 'Alessandro';
person2.surname = 'Avolio';
person2.phoneNumber = 222222;
persons.push(person2);

var person3: Person = new Person();
person3.name = 'Dario';
person3.surname = 'Fabbri';
person3.phoneNumber = 333333;
persons.push(person3);

var person4: Person = new Person();
person4.name = 'Fabio';
person4.surname = ' Staro';
person4.phoneNumber = 444444;
persons.push(person4);

export var PHONEBOOK_CONTACTS: Array<Person> = persons;