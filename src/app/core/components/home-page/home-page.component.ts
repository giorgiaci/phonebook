import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/login/login.model';
import { LoginService } from 'src/app/login/login.service';
import { Person } from 'src/app/person/models/person.model';
import { PersonsService } from 'src/app/person/services/persons.service';
import { ModaleComponent } from '../modal/modal.component';

let $:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePageComponent implements OnInit {
  user:Person[]=[];
  username;
  searchResult: Array<LoginModel>;    
  
  constructor(  private personService: PersonsService,
                private loginService: LoginService,
                private router:Router){ }

  ngOnInit() {
    this.username = this.loginService.getUsername();
    this.personService.findPersons(this.username).subscribe(res => this.user = res);
    this.redirect();
  }
  
  
  redirect(){
    if (!this.username) {          
      alert('effettua il login')
      const redirectUrl = '/login';

      this.router.navigate([redirectUrl]);
    }
  
  }
}
