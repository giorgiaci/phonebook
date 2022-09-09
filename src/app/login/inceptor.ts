import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
 
export class AddHeaderInterceptor implements HttpInterceptor {


constructor(private loginService:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    if(req.url.indexOf('login') >= 0){
      return next.handle(req)
    }else{
       const clonedRequest = req.clone({ headers: req.headers.set('Token', this.loginService.getUsername() ) });
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
    }
   
  }
}