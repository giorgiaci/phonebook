import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({  providedIn: 'root',})
export class LoginGuard implements CanActivate {  

  constructor(private loginService: LoginService, private router: Router) {}
  
  canActivate( next: ActivatedRouteSnapshot,  state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  canActivateChild( route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): true|UrlTree {
    return this.canActivate(route, state);
  }
  
  checkLogin(url: string): true|UrlTree {
    if (this.loginService.isLogged()) { return true; }

   // Store the attempted URL for redirecting
   this.loginService.redirectUrl = url;
    //Redirect to the login page
    return this.router.parseUrl('login');
  }
}