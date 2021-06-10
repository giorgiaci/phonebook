import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/login/login.model';
import { LoginService } from 'src/app/login/login.service';
import { Person } from 'src/app/person/models/person.model';
import { PersonsService } from 'src/app/person/services/persons.service';
import { ModaleComponent } from '../modal/modal.component';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePageComponent implements OnInit {
  
  username;
  searchResult: Array<LoginModel>;    
  
  constructor(  private personService: PersonsService,
                private loginService: LoginService,
                private router:Router){ }

  ngOnInit() {
    // this.username = this.loginService.getUsername().subscribe((user) => {
    //   this.person = user;

     this.username = this.loginService.getUsername();

     this.loginService.getUsername().subscribe((user) => {
       this.searchResult = user;
      
     });
    
     this.redirect();
  }
   redirect(){
     if (!this.username) {
     
      
       alert('effettua il login')
       const redirectUrl = '/login';

       this.router.navigate([redirectUrl]);
     }
  
   }
 
  // @ViewChild('aleTiOdio') myModal:ElementRef;
  @ViewChild('aleTiOdio') myModal:ModaleComponent;

  showModal(){
    //open modal using jQuery
    this.myModal.open();
  }
}
