import { Injectable, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient, private route: Router) {}

  private username;
  private userpassword;
  private loggedIn = false;

  private _redirectUrl;
  login: LoginModel;
  loginForm: FormGroup;

  public checkUser(nome: string, pass: string): Observable<boolean> {
    return this.http
      .get<LoginModel>(
        `http://localhost:3000/login?name=${nome}&password=${pass}`
      )
      .pipe(
        map((logUsers: any): boolean => {
          if (logUsers.length == 0) {
            this.loggedIn = false;
          } else {
            this.username = nome;
            this.userpassword = pass;
            this.loggedIn = true;
            this.route.navigateByUrl(this.redirectUrl);
          }
          return this.loggedIn;
        })
      );
  }
  public getUser(nome, pass): Observable<LoginModel> {
    return this.http
      .get<LoginModel>(
        `http://localhost:3000/login?name=${nome}&password=${pass}`
      )
      .pipe(
        map((user: LoginModel) => {
          return user;
        })
      );
  }

  public logOut() {
    sessionStorage.clear();
    window.location.reload();
    
    setInterval(() => {
        this.username = undefined;
        this.userpassword = undefined;
        this.loggedIn = false;
      }, 5000);
   
    
  }

  public getUsername() {
    return this.username;
  }
  public getToken() {
    return this.userpassword;
  }
  public isLogged() {
    return this.loggedIn;
  }

  public get redirectUrl() {
    return this._redirectUrl;
  }
  public set redirectUrl(value) {
    this._redirectUrl = value;
  }
}
