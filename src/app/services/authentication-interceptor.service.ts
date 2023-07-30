import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../state/userState/user.service';
import { UserStore } from '../state/userState/user.store';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService, private userStore: UserStore) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('sessionId')}`)});
    const sessionId = localStorage.getItem('sessionId')
    if (!sessionId) {
      this.userService.setSessionId();
    } else {
      this.userStore.update({ sessionId });
    }
    return next.handle(modifiedReq);
  }
}
