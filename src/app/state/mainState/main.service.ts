import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MainService {
  public headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('sessionId')}`);

  constructor(
    private http: HttpClient,
  ) { }

  getDietAgencies() {
    return this.http
      .get<any>('http://localhost:4000/api/v1/dietAgencies', { headers: this.headers })
      .pipe(
        retry(1)
      );
  }

  getDietAgency(productId: string) {
    return this.http
      .get<any>(`http://localhost:4000/api/v1/dietAgencies/${productId}`, { headers: this.headers })
      .pipe(
        retry(1)
      );
  }
}

