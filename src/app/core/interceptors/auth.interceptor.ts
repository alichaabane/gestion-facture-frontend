import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {interval, Observable, startWith, switchMap} from "rxjs";
import {UserService} from "../services/http/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor{

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    let isAuthenticated = this.userService.isUserAuthenticated;

    if ( (req.url.includes('/api/')  && isAuthenticated && token) || (req.url.includes('/api/auth/current') )){
      const request = req.clone({
        setHeaders: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      return next.handle(request);
    }
    return next.handle(req);
  }
}
