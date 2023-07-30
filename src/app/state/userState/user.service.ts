import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry, tap } from "rxjs/operators";
import { UserStore } from "./user.store";
import { LoginResponse, SignupResponse } from "src/app/models/diet-agency";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private userStore: UserStore) {}

  login(body: {email: string, password: string}) {
    return this.http
      .post<LoginResponse>('http://localhost:4000/api/v1/users/login',
        body
      )
      .pipe(
        tap((value: LoginResponse) => {
          localStorage.setItem('sessionId', value.token);
        }),
        retry(1)
      );
  }

  signup(body: {email: string, password: string}) {
    return this.http
      .post<SignupResponse>('http://localhost:4000/api/v1/users',
        body
      )
      .pipe(
        tap((value: SignupResponse) => {
          // localStorage.setItem('sessionId', value.token);
        }),
        retry(1)
      );
  }

  setSessionId(sessionId?: string) {
    this.userStore.update({sessionId: sessionId});
  }
}