import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private loginService: LoginService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.inizializzaForm();
    }

  onSubmit() {
    let loginValue = this.loginForm.value;

    let newLogin = new LoginModel();
    newLogin.name = loginValue.name;
    newLogin.password = loginValue.password;

    this.loginService.checkUser(newLogin.name, newLogin.password).subscribe(
      (rispostaServerGestita) => {
        if (rispostaServerGestita === true) {
          this.router.navigate(['home']);
        } else {
          this.loginError = true;
        }
      },
      (error) => {
        console.warn('Utente non trovato', error);
      }
    );
  }

  inizializzaForm() {
    this.loginForm = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
 
  loggedIn() {
    return this.loginService.getUsername();
  }
}
