import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  public destroyed = new Subject<any>();
  constructor(
    private loginService: LoginService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.inizializzaForm();
    this.getUser();
  }

  onSubmit() {
    let loginValue = this.loginForm.value;

    let newLogin = new LoginModel();
    newLogin.name = loginValue.name;
    newLogin.password = loginValue.password;

    this.loginService.checkUser(newLogin.name, newLogin.password).subscribe(
      (rispostaServerGestita) => {
        if (rispostaServerGestita === true) {
          this.loginForm.patchValue({
            name: this.loginService.getUsername(),
            password: this.loginService.getToken(),
          });
          this.router.navigate(['home']);
        } else {
          this.loginError = true;
        }
      },
      (error) => {
        console.error('utente non trovato', error);
      }
    );
  }

  inizializzaForm() {
    this.loginForm = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  getUser() {
    this.loginForm.patchValue({
      name: this.loginService.getUsername(),
      password: this.loginService.getToken(),
    });
   
  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
  loggedIn() {
    return this.loginService.getUsername();
  }
}
