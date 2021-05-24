import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Phone Book'; 
  logStatus;
  isLogged = true;
  

  constructor(private loginService: LoginService, private route:Router){ }
   ngOnInit(){
     this.loggedIn();
   }
  loggedIn(){
    return this.loginService.getUsername()
  }
  logOut(){
    this.loginService.logOut();
    this.route.navigate(['login']);
  }
  goToLogin(){
    this.route.navigate(['login']);
  }

}