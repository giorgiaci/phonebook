import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './login.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';



@Injectable({ providedIn: 'root' })


export class LoginService {
 

  constructor(private http: HttpClient, private route: Router) {
 
  }

  private username;
  private loggedIn = false;
  private _redirectUrl;

  public checkUser(nome: string, pass: string): Observable<boolean> {
    return this.http
      .get<LoginModel[]>(
        `http://localhost:3000/login?name=${nome}&password=${pass}`
      )
      .pipe(
        map((logUsers: any): boolean => {
          if (logUsers.length == 0) {
            this.loggedIn = false;
          } else {
            this.username = nome;
            this.loggedIn = true;
            this.route.navigateByUrl(this.redirectUrl);
          }
          return this.loggedIn;
        })
      );
  }
  // public logOut(){
  //     this.username = undefined
  // }
  public logOut() {
    this.username = undefined;
    this.loggedIn = false;
  }
  public getUsername() {
    return this.username;
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

  // public isLogged(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap((val) => (this.loggedIn = true))
  //   );
  // }
}
