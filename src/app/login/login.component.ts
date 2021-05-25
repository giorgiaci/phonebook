import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from 'src/app/login/login.service';
import { LoginModel } from './login.model';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  loginForm: FormGroup;
  loginError = false;
  loginUser:LoginModel;

  constructor(private loginService: LoginService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.inizializzaForm();
    const idUser = +this.activateRoute.snapshot.paramMap.get('name');
     this.getUser(idUser);
  }
  onSubmit(){
    let loginValue = this.loginForm.value;
    
    let newLogin = new LoginModel();
      newLogin.name = loginValue.name;
      newLogin.password = loginValue.password;
    
      this.loginService.checkUser(newLogin.name, newLogin.password).subscribe(
        (rispostaServerGestita)=>{
          if(rispostaServerGestita===true ){
             this.router.navigate(['home'])
          }else{
            this.loginError = true;
          }         
        },
        (error) => { console.error('utente non trovato', error) }
     );
  }
  inizializzaForm() {
    this.loginForm = this.fb.group({
     
      name: [undefined, Validators.required],
      password: [undefined, Validators.required]
        
    })
  }
  getUser(idUser){
    this.loginService.getUser(idUser).subscribe((user)=>{
      this.loginForm.get('name').setValue(user.name);
      this.loginForm.get('password').setValue('******');
      this.loginUser = user;
    })
  }
}
