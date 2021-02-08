import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Person } from './person.model';
import { PersonsService } from './persons.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Phone Book';
  searchResult: Array<Person>;    
  searchForm: FormGroup;
 
 
  constructor(private phonebook: PersonsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.phonebook.getPersons().subscribe((persons) => {
      this.searchResult = persons;
    });
    this.inizializzaForm();
  }
  
  inizializzaForm() {
    this.searchForm = this.fb.group({
      surnameCriteria: this.fb.control(undefined, [])      
    })    
  }
  search(){
    let formValue = this.searchForm.value;
    this.phonebook.findPersons(formValue.surnameCriteria).subscribe((persons) => {
      this.searchResult = persons;
    });
  }
 
 
  
}
