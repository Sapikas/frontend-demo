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

  getDietAgency(productName: string) {
    return this.http
      .get<any>(`http://localhost:4000/api/v1/dietAgencies/${productName}`, { headers: this.headers })
      .pipe(
        retry(1)
      );
  }

  searchDietAgencies(dietAgencyName: string) {
    return this.http
      .post<any>('http://localhost:4000/api/v1/dietAgencies/search', { payload: dietAgencyName }, { headers: this.headers })
      .pipe(
        retry(1)
      );
  }
}

