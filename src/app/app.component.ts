import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Phone Book'; 
 
  constructor(private loginService: LoginService, private route:Router){ }
   
  logOut(){
    this.loginService.logOut();
    this.route.navigate(['login']);
   
  }

}