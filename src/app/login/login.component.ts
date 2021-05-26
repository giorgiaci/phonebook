import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loginUser: LoginModel;
  isLogged = this.activateRoute.snapshot.paramMap.get('login');

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
<<<<<<< Updated upstream
    newLogin.name = loginValue.name;
    newLogin.password = loginValue.password;
    this.loginForm.patchValue({
      name: this.loginService.getUsername(),
      password: this.loginService.getToken(),
    })
    this.loginService.checkUser(newLogin.name, newLogin.password).subscribe(
=======

    newLogin.name = loginValue.name;
    newLogin.password = loginValue.password;

    this.loginService.checkUser(newLogin.name, newLogin.password).subscribe(
      (rispostaServerGestita) => {
        if (rispostaServerGestita === true) {
          //  this.router.navigate([''])
        } else {
          this.loginError = true;
        }
      },
      (error) => {
        console.error('utente non trovato', error);
      }
    );

    newLogin.name = loginValue.name;
    newLogin.password = loginValue.password;
>>>>>>> Stashed changes

    this.loginService.checkUser(newLogin.name, newLogin.password).subscribe(
      (rispostaServerGestita) => {
        if (rispostaServerGestita === true) {
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
<<<<<<< Updated upstream
 if(this.isLogged) {
=======
    this.loginForm = this.fb.group({
      name: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });

    //  if(this.isLogged) {

    //       this.loginForm.patchValue({
    //         name: this.loginService.getUsername(),
    //         password: this.loginService.getToken(),
    //       })
    //     }  else {
>>>>>>> Stashed changes

    if (this.isLogged) {
      this.loginForm.patchValue({
        name: this.loginService.getUsername(),
        password: this.loginService.getToken(),
<<<<<<< Updated upstream
      })
    }  else {
=======
      });
    } else {
>>>>>>> Stashed changes
      this.loginForm = this.fb.group({
        name: [null, Validators.required],
        password: [null, Validators.required],
      });

<<<<<<< Updated upstream
      })
    }

=======
      // }
    }
>>>>>>> Stashed changes
  }

  loggedIn() {
<<<<<<< Updated upstream
    return this.loginService.getUsername()
=======
    return this.loginService.getUsername();
>>>>>>> Stashed changes
  }
}
